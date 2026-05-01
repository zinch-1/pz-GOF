/**
 * Патерн: Bridge (Міст)
 * Проблема: Потрібно розділити великий клас або ієрархію класів на дві незалежні площини (абстракцію та реалізацію).
 * Анти-приклад: Декартовий добуток підкласів. Наприклад, створення `TvBasicRemote`, `TvAdvancedRemote`, `RadioBasicRemote`, `RadioAdvancedRemote` (експоненційне зростання класів).
 */

// Реалізація (Пристрої)
interface Device {
    turnOn(): void;
    turnOff(): void;
    setVolume(percent: number): void;
}

class TV implements Device {
    turnOn(): void { console.log("Телевізор увімкнено."); }
    turnOff(): void { console.log("Телевізор вимкнено."); }
    setVolume(percent: number): void { console.log(`Гучність телевізора: ${percent}%`); }
}

class Radio implements Device {
    turnOn(): void { console.log("Радіо увімкнено."); }
    turnOff(): void { console.log("Радіо вимкнено."); }
    setVolume(percent: number): void { console.log(`Гучність радіо: ${percent}%`); }
}

// Абстракція (Пульти)
class RemoteControl {
    protected device: Device;

    constructor(device: Device) {
        this.device = device;
    }

    togglePower(): void {
        console.log("Натиснуто кнопку живлення на пульті.");
        this.device.turnOn(); // Спрощено
    }
}

class AdvancedRemoteControl extends RemoteControl {
    mute(): void {
        console.log("Натиснуто кнопку Mute на просунутому пульті.");
        this.device.setVolume(0);
    }
}

export function testBridge() {
    console.log("--- Bridge ---");
    const tv = new TV();
    const radio = new Radio();

    const basicRemote = new RemoteControl(tv);
    basicRemote.togglePower();

    const advancedRemote = new AdvancedRemoteControl(radio);
    advancedRemote.togglePower();
    advancedRemote.mute();
    console.log("");
}