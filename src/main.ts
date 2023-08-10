addEventListener('DOMContentLoaded', main);
import './style.css';
import style from './style.module.css';

import { TandotypeApp } from "./tandotype-engine/app";
import { TandotypeConfig } from "./tandotype-engine/types";
import { TDTimeDateUtility } from './tandotype-engine/utilities/timer';


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
    app.loadTimerUtilities(        
        TDTimeDateUtility({ nameStyling: style.a, valueStyling: style.b, elementStyling: style.c}),
    );
    app.render(document.body);
}