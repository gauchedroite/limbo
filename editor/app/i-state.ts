
export interface IProps {
    appState: IState;
}

export interface IState {
    game: IGame;
    chapter: IChapter;
    scene: IScene;
    status: string;
}

export interface IGame {
}

export interface IChapter {
}

export interface IScene {
    heading: string;
}
