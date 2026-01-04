import {
    animate,
    group,
    query,
    style,
    transition,
    trigger,
} from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
    transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                opacity: 0,
                transform: 'scale(0.98) translateY(10px)',
            }),
        ], { optional: true }),
        query(':enter', [
            style({ opacity: 0, transform: 'scale(0.98) translateY(10px)' }),
        ], { optional: true }),
        group([
            query(':leave', [
                animate('300ms ease-out', style({ opacity: 0, transform: 'scale(1.02) translateY(-10px)' })),
            ], { optional: true }),
            query(':enter', [
                animate('400ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
            ], { optional: true }),
        ]),
    ]),
]);
