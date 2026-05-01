/**
 * Патерн: Singleton (Одинак - Новий приклад)
 * Проблема: Потрібен єдиний журнал логування (Logger) для всієї системи, щоб записи не перезаписували одне одного і зберігали хронологію.
 * Анти-приклад: Створення нового екземпляра логера в кожному класі, що призводить до втрати загальної історії повідомлень і блокування файлів логів.
 */

class SystemLogger {
    private static instance: SystemLogger;
    private logs: string[] = [];

    private constructor() {}

    public static getInstance(): SystemLogger {
        if (!SystemLogger.instance) {
            SystemLogger.instance = new SystemLogger();
        }
        return SystemLogger.instance;
    }

    public log(message: string): void {
        const entry = `[${new Date().toISOString()}] ${message}`;
        this.logs.push(entry);
        console.log(entry);
    }

    public printHistory(): void {
        console.log(`Всього логів: ${this.logs.length}`);
    }
}

export function testSingletonLogger() {
    console.log("--- Singleton (Logger) ---");
    const authModuleLogger = SystemLogger.getInstance();
    const dbModuleLogger = SystemLogger.getInstance();

    authModuleLogger.log("Користувач увійшов у систему.");
    dbModuleLogger.log("Зроблено запит до таблиці orders.");

    // Перевіряємо, що обидва логери працюють з однією історією
    authModuleLogger.printHistory();
    console.log("");
}