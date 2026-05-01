/**
 * Патерн: Composite (Компонувальник)
 * Проблема: Потрібно працювати з деревоподібною структурою об'єктів (наприклад, файлова система) так, ніби це один об'єкт.
 * Анти-приклад: Використання масиву if-else `if (element instanceof Folder) { ... } else if (element instanceof File) { ... }` для розрахунку розміру папки з вкладеностями.
 */

interface FileSystemComponent {
    getName(): string;
    getSize(): number;
}

// "Листок" дерева
class SystemFile implements FileSystemComponent {
    constructor(private name: string, private size: number) {}

    getName(): string { return this.name; }
    getSize(): number { return this.size; }
}

// "Контейнер" (Композит)
class Folder implements FileSystemComponent {
    private children: FileSystemComponent[] = [];

    constructor(private name: string) {}

    public add(component: FileSystemComponent): void {
        this.children.push(component);
    }

    getName(): string { return this.name; }

    // Рекурсивно збирає розмір
    getSize(): number {
        return this.children.reduce((total, child) => total + child.getSize(), 0);
    }
}

export function testComposite() {
    console.log("--- Composite ---");
    const file1 = new SystemFile("document.txt", 15);
    const file2 = new SystemFile("photo.jpg", 120);
    const file3 = new SystemFile("video.mp4", 1500);

    const folder1 = new Folder("Documents");
    folder1.add(file1);

    const folder2 = new Folder("Media");
    folder2.add(file2);
    folder2.add(file3);

    const rootDirectory = new Folder("Root");
    rootDirectory.add(folder1);
    rootDirectory.add(folder2);

    console.log(`Розмір папки Media: ${folder2.getSize()} MB`);
    console.log(`Загальний розмір Root: ${rootDirectory.getSize()} MB`);
    console.log("");
}