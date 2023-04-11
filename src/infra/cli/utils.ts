export class CLIUtils {

    static barProgress(progress: number) {

        const barChars = new Array(100).fill('_')
            .map((char, index) => index <= progress ? '*' : char);

        barChars.push(` ${progress}%`);

        return barChars.join('');

    }
}