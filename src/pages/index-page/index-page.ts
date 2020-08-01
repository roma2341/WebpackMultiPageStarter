import { Greeter } from '../../services/greeter-service/greeter';

const g = new Greeter('Index-page');
g.greet();

console.log('index page loaded');