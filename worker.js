const axios = require('axios');
const crypto = require('crypto');

// --- TACTICAL CLUSTER CONFIG ---
const MASTER_IP = '[REDACTED_IP]'; // The IP of this Laptop
const MASTER_URL = `http://${MASTER_IP}:3000`;
const WORKER_ID = `DESKTOP_WORKER_NODE_${Math.floor(Math.random()*1000)}`;

console.log(`[DESKTOP NODE] Connecting to Master at ${MASTER_URL}...`);

async function poll() {
    try {
        const response = await axios.post(`${MASTER_URL}/api/grid/work`, { workerId: WORKER_ID });
        const task = response.data.task;

        if (task) {
            console.log(`[DESKTOP] Executing Task: ${task.taskId}`);
            const start = Date.now();
            
            // Execute compute (Simulate Advanced Code Advance)
            const hash = crypto.createHash('sha256').update(task.payload + Date.now()).digest('hex');
            const computeTime = Date.now() - start;
            const result = `/* COMPUTE_ADVANCE */\nWorker: ${WORKER_ID}\nTime: ${computeTime}ms\nHash: ${hash}`;

            // 1. Submit result back to Master Queue
            await axios.post(`${MASTER_URL}/api/grid/work`, {
                workerId: WORKER_ID,
                taskId: task.taskId,
                result: result
            });

            // 2. POPULATE CENTRAL HUB DB Directly (Optional Data Drop)
            await axios.post(`${MASTER_URL}/api/grid/db/populate`, {
                source: WORKER_ID,
                type: 'worker_telemetry',
                payload: { taskId: task.taskId, time: computeTime, status: 'SUCCESS' }
            });

            console.log(`[DESKTOP] Task ${task.taskId} submitted and logged to Hub.`);
        }
    } catch (e) {
        if (e.code === 'ECONNREFUSED') {
            console.log("Master unreachable. Ensure Port 3000 is open on the Laptop.");
        }
    }
    setTimeout(poll, 2000);
}

poll();
