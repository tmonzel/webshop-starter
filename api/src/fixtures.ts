import './environment';
import { establishConnection } from './database';
import { Product, ProductModel } from './models/product.model';

const createProduct = (product: Product): void => {
    const p = new ProductModel( product );
    p.save((error) => {
        if(error) {
            console.log(error);
            return;
        }

        console.log("Document created", product.name);
    });
};

establishConnection(() => {
    const products: Product[] = [
        {
            name: 'Windows',
            type: 'Software',
            description: `Windows 10 wird Ihnen so vertraut vorkommen, dass Sie sich wie ein Experte fühlen. Das Startmenü ist zurück und es ist besser geworden. Alle Ihre angehefteten Apps und Favoriten werden übernommen und Sie können da weiter machen, wo Sie aufgehört haben. Der Startvorgang ist schneller, es kommt mit mehr Sicherheit und es läuft mit der Software und auf der Hardware, die Sie bereits im Einsatz haben. Das Windows Insider Programm ist eine weltweite Community von Windows-Fans, die Windows besser machen möchten. Insider können das Betriebssystem schon von Anfang an testen und die Entwicklung beeinflussen.`,
            imageUrl: '',
            price: { value: 100, currency: 'EUR' }
        },

        {
            name: 'Faserland',
            type: 'Book',
            description: `Einmal durch die Republik, von Nord nach Süd: Christian Krachts namenloser Ich-Erzähler berichtet von seiner Deutschlandreise. Der kleine Bildungsroman »Faserland« veränderte in Deutschland die Wahrnehmung einer ganzen Generation, von der es vorher hieß, sie habe gar keine Wahrnehmung.
            Die Kontroversen, die 1995 sofort nach der Veröffentlichung des Romans »Faserland« ausbrachen, haben sich gelegt, der Roman ist heute ein Klassiker der deutschsprachigen Gegenwartsliteratur, der immer wieder neue Leser fasziniert.`,
            imageUrl: '/images/faserland-093489016.jpg',
            price: { value: 23.99, currency: 'EUR' }
        }
    ];


    products.forEach(p => createProduct(p));
});
