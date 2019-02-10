import { Service } from 'ts-framework-common';
export default class UptimeService extends Service {
    private static instance;
    history: {
        constructed: number;
        mounted: number;
        initialized: number;
        ready: number;
        unmounted: number;
    };
    constructor(options: any);
    static getInstance(): UptimeService;
    onMount(): void;
    onUnmount(): Promise<void>;
    onInit(): Promise<void>;
    onReady(): Promise<void>;
    uptime(): number;
}
