import { testPrototype } from "../creational/prototype";
import { testSingletonLogger } from "../creational/singleton-logger";
import { testBridge } from "../structural/bridge";
import { testComposite } from "../structural/composite";
import { testChainOfResponsibility } from "../behavioral/chain-of-responsibility";
import { testTemplateMethod } from "../behavioral/template-method";

console.log("==========================================");
console.log("Демонстрація GOF Патернів Проєктування");
console.log("==========================================\n");

// Creational
testPrototype();
testSingletonLogger();

// Structural
testBridge();
testComposite();

// Behavioral
testChainOfResponsibility();
testTemplateMethod();

console.log("==========================================");
console.log("Демонстрацію успішно завершено.");
console.log("==========================================");