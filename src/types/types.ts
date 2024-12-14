export type TablesContent = {
    europa: CellTableContent[],
    azja: CellTableContent[],
    afryka: CellTableContent[],
    ameryka_polnocna: CellTableContent[],
    ameryka_poludniowa: CellTableContent[],
    oceania: CellTableContent[]
}

export interface CellTableContent {
    name: string,
    guessed: boolean
}