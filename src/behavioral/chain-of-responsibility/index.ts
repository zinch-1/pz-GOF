/**
 * Патерн: Chain of Responsibility (Ланцюжок обов'язків)
 * Проблема: Уникнення жорсткої прив'язки відправника запиту до його одержувача. Запит проходить через ланцюжок обробників, поки хтось його не обробить.
 * Анти-приклад: Монолітний метод `processRequest`, що містить гігантську логіку перевірки `if(auth) { if(validation) { if(cache) {...} } }`.
 */

interface Handler {
    setNext(handler: Handler): Handler;
    handle(request: string): string | null;
}

abstract class AbstractHandler implements Handler {
    private nextHandler: Handler | null = null;

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    public handle(request: string): string | null {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null;
    }
}

class AuthHandler extends AbstractHandler {
    public handle(request: string): string | null {
        if (request === "guest_request") {
            return "AuthHandler: Блокування. Гість не має прав.";
        }
        console.log("AuthHandler: Успіх. Передача далі...");
        return super.handle(request);
    }
}

class ValidationHandler extends AbstractHandler {
    public handle(request: string): string | null {
        if (request.includes("invalid")) {
            return "ValidationHandler: Блокування. Дані не валідні.";
        }
        console.log("ValidationHandler: Успіх. Передача далі...");
        return super.handle(request);
    }
}

export function testChainOfResponsibility() {
    console.log("--- Chain of Responsibility ---");
    const auth = new AuthHandler();
    const validation = new ValidationHandler();

    // Формуємо ланцюжок
    auth.setNext(validation);

    console.log(auth.handle("guest_request") || "Запит виконано!");
    console.log("---");
    console.log(auth.handle("admin_invalid_request") || "Запит виконано!");
    console.log("---");
    console.log(auth.handle("admin_valid_request") || "Запит виконано!");
    console.log("");
}