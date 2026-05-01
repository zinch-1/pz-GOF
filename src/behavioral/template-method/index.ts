/**
 * Патерн: Template Method (Шаблонний метод)
 * Проблема: Потрібно визначити кістяк алгоритму, дозволивши підкласам перевизначати певні його кроки, не змінюючи загальної структури.
 * Анти-приклад: Дублювання одного й того ж 5-крокового алгоритму в різних класах, де відрізняється лише один крок.
 */

abstract class DataProcessor {
    // Шаблонний метод (скелет алгоритму)
    public processData(): void {
        this.readData();
        this.parseData();
        this.saveData();
    }

    // Кроки, які обов'язково треба реалізувати в підкласах
    protected abstract readData(): void;
    protected abstract parseData(): void;

    // Базова реалізація (може бути перевизначена, але не обов'язково)
    protected saveData(): void {
        console.log("DataProcessor: Збереження даних у загальну базу.");
    }
}

class CSVProcessor extends DataProcessor {
    protected readData(): void {
        console.log("CSVProcessor: Читання файлу .csv");
    }
    protected parseData(): void {
        console.log("CSVProcessor: Парсинг рядків CSV.");
    }
}

class PDFProcessor extends DataProcessor {
    protected readData(): void {
        console.log("PDFProcessor: Читання файлу .pdf");
    }
    protected parseData(): void {
        console.log("PDFProcessor: Витягування тексту з PDF за допомогою OCR.");
    }
    // Перевизначений метод
    protected saveData(): void {
        console.log("PDFProcessor: Збереження даних у спеціальне сховище для документів.");
    }
}

export function testTemplateMethod() {
    console.log("--- Template Method ---");
    console.log("Обробка CSV:");
    const csv = new CSVProcessor();
    csv.processData();

    console.log("\nОбробка PDF:");
    const pdf = new PDFProcessor();
    pdf.processData();
    console.log("");
}