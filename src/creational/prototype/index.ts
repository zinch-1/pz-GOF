/**
 * Патерн: Prototype (Прототип)
 * Проблема: Потрібно створити точну копію існуючого об'єкта, не прив'язуючись до його конкретного класу, особливо якщо об'єкт має складний внутрішній стан.
 * Анти-приклад: Створення об'єкта через new і ручне копіювання кожного поля (`const b = new Enemy(); b.hp = a.hp;`), що неможливо зробити з приватними полями.
 */

interface Prototype {
    clone(): this;
}

class OrcWarrior implements Prototype {
    public health: number;
    public weapon: string;
    private battleCry: string; // Приватне поле, яке важко скопіювати ззовні

    constructor(health: number, weapon: string, battleCry: string) {
        this.health = health;
        this.weapon = weapon;
        this.battleCry = battleCry;
    }

    public clone(): this {
        // У TypeScript можна використати Object.assign або Spread operator для поверхневого копіювання
        // Для глибокого копіювання реалізується кастомна логіка
        const cloned = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
        return cloned;
    }

    public attack(): void {
        console.log(`Орк атакує з ${this.weapon}! Кричить: "${this.battleCry}" (HP: ${this.health})`);
    }
}

export function testPrototype() {
    console.log("--- Prototype ---");
    const baseOrc = new OrcWarrior(100, "Сокира", "За Орду!");

    // Створюємо армію через клонування замість ініціалізації з нуля
    const orc1 = baseOrc.clone();
    const orc2 = baseOrc.clone();
    orc2.weapon = "Меч"; // Модифікуємо клона

    baseOrc.attack();
    orc1.attack();
    orc2.attack();
    console.log("");
}