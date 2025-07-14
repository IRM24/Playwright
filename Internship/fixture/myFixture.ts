import { test as myTest } from '@playwright/test';

type ian = {
    age: number,
    email: string
}

const myFixtureTest = myTest.extend<ian>({
    age: 22,
    email: "ian@gmail.com"
})

export const test = myFixtureTest;