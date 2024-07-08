// server/queue.js
class Queue {
    constructor() {
        this.tasks = [];
        this.isProcessing = false;
    }

    addTask(task) {
        this.tasks.push(task);
        this.processQueue();
    }

    async processQueue() {
        if (this.isProcessing) return;
        this.isProcessing = true;

        while (this.tasks.length) {
            const currentTask = this.tasks.shift();
            await currentTask();
        }

        this.isProcessing = false;
    }
}

export default new Queue();
