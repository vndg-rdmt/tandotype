addEventListener('DOMContentLoaded', main);
import './style.css';
import style from './style.module.css';

import { TandotypeApp } from "./tandotype-engine/app";
import { TandotypeConfig } from "./tandotype-engine/types";


function main(): void {
    const config: TandotypeConfig = {
        keysLocales: new Map([
            ['default', 'qwertyuiopasdfghjklzxcvbnm'.split('')],
        ]),
        cssClasses: {
            app:            style.app,
            keyboard:       style.keyboard,
            keybutton:      style.keyButton,
            keypressed:     style.keypressed,
            utilityBlock:   'string',
            utilityText:    'string',
        },
    };

    const app = new TandotypeApp(config);
    app.loadUtilities()
    app.render(document.body);
}