"use strict";

export interface Chapter {
    _id: number;
    title: string;
}

export interface Actor {
    _id: number;
    name: string;
    faces: Array<Mood>;
}

export interface Mood {
    mood_id: number,
    caption: string;
    url: string;
}

export interface Location {
    _id: number,
    caption: string;
    url: string;
}

export interface Scene {
    _id: number;
    location: any,
    when: string[];
    then?: string[];
    remember?: string[];
    timeout?: number;
    enter?: Transition;
    leave?: Transition;
    steps: Step[];
}

export interface Transition {
    transition: string;
    run: string;
}

export interface Step {
    when?: string[];
    style?: string;
    action?: Action;
    dialog?: Dialog;
    question?: Question;
}

export interface Action {
    line: string;
    style?: string;
}

export interface ActorKey {
    _id: number;
    mood_id: number;
}

export interface Dialog {
    actor: ActorKey;
    parenthetical?: string;
    line?: string;
    random?: Line[];
}

export interface Line {
    odds?: number;
    line: string;
    then?: string[];
}

export interface Question {
    actor: ActorKey;
    parenthetical?: string;
    ask: string;
    choices: Choice[];
}

export interface Choice {
    line: string;
    then?: string[];
    default?: boolean;
    remember?: string[];
}

