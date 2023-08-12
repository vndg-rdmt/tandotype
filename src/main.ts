addEventListener('DOMContentLoaded', main);
import './style.css';
import style from './style.module.css';

import { TandotypeApp } from "./tandotype-engine/app";
import { TandotypeConfig } from "./tandotype-engine/types";
import { TDCharsTypedUtility } from './tandotype-engine/utilities/chars-typed';
import { TDEmptyBlockUtility } from './tandotype-engine/utilities/empty-block';
// import { TDTimeDateUtility } from './tandotype-engine/utilities/timer';
import { TDCharsTypingSpeedUtility } from './tandotype-engine/utilities/typing-speed';
import { TDWordsTypedUtility } from './tandotype-engine/utilities/words-types';


function main(): void {
    const config: TandotypeConfig = {
        keysLocales: new Map([
            ['default', 'qwertyuiopasdfghjklzxcvbnm'.split('')],
        ]),
        cssClasses: {
            app:            style.app,
            utilsHolder:    style.utilsHolder,
            keyboard:       style.keyboard,
            keybutton:      style.keyButton,
            keypressed:     style.keypressed,
            utilityBlock:   'string',
            utilityText:    'string',
        },
    };

    const app = new TandotypeApp(config);
    app.renderUtils(
        // - 1
        ...app.loadUndefinedUtilites(
            TDEmptyBlockUtility({elementStyling: [style.helperHeaderBlock, style.defaultUtilityBlock].join(' '), nameStyling: '', valueStyling: ''}),
        ),
        // - 2
        app.wrapUtils(style.actionUtilsSubblock,
            app.wrapUtils(style.topActionsWrapper,
                ...app.loadUndefinedUtilites(
                    TDEmptyBlockUtility({elementStyling: style.bigCharBlock, nameStyling: '', valueStyling: ''}),
                    TDEmptyBlockUtility({elementStyling: style.bigEmptyBlock, nameStyling: '', valueStyling: ''}),
                    TDEmptyBlockUtility({elementStyling: style.bigCharBlock, nameStyling: '', valueStyling: ''}),
                ),
            ),
            app.wrapUtils(style.topActionsWrapper,
                ...app.loadUndefinedUtilites(
                    TDEmptyBlockUtility({elementStyling: style.bigCharBlock, nameStyling: '', valueStyling: ''}),
                ),
                app.wrapUtils(style.secondColumnWrapperBottomOne,
                    ...app.loadUndefinedUtilites(
                        TDEmptyBlockUtility({elementStyling: style.defaultBlock, nameStyling: '', valueStyling: ''}),
                        TDEmptyBlockUtility({elementStyling: style.defaultBlock, nameStyling: '', valueStyling: ''}),
                    ),
                ),
                app.wrapUtils(style.lastFlexBasicBlock,
                    ...app.loadUndefinedUtilites(
                        TDEmptyBlockUtility({elementStyling: style.lastFlexItems, nameStyling: '', valueStyling: ''}),
                        TDEmptyBlockUtility({elementStyling: style.lastFlexItems, nameStyling: '', valueStyling: ''}),
                        TDEmptyBlockUtility({elementStyling: style.lastFlexItems, nameStyling: '', valueStyling: ''}),
                        TDEmptyBlockUtility({elementStyling: style.lastFlexItems, nameStyling: '', valueStyling: ''}),
                    ),
                ),
            ),
        ),
    );
    app.launch(document.body);
}