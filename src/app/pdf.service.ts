import autoTable, { CellInput } from 'jspdf-autotable';
import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root',
})

export class PdfService {
  constructor() {}

  public gerarPdf(
    dadosArray: any[],
    textoCabecalho: string,
    textoRodape: string,
    logoUrl: string
  ) {
    const doc = new jsPDF();

    doc.addImage(logoUrl, 'PNG', 10, 10, 30, 30);
    doc.setFontSize(18);
    doc.text(textoCabecalho, 50, 20);

    let startY = 40;

    dadosArray.forEach((item) => {
      Object.keys(item).forEach((chave) => {
        const dadosTabela = item[chave];

        if (Array.isArray(dadosTabela) && dadosTabela.length > 0) {
          const cabecalho = Object.keys(dadosTabela[0]).map(
            (key) => key.charAt(0).toUpperCase() + key.slice(1)
          );

          const corpoTabela: CellInput[][] = dadosTabela.map(
            (obj) => Object.values(obj) as CellInput[] 
          );

          autoTable(doc, {
            startY,
            head: [cabecalho],
            body: corpoTabela,
          });

          startY = (doc as any).lastAutoTable.finalY + 10;
        }
      });
    });

    const contadorDePaginas = doc.getNumberOfPages();
    for (let i = 1; i <= contadorDePaginas; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(textoRodape, 10, doc.internal.pageSize.height - 10);
      doc.text(
        `Página ${i} de ${contadorDePaginas}`,
        doc.internal.pageSize.width - 50,
        doc.internal.pageSize.height - 10
      );
    }

    doc.save('relatorio.pdf');
  }
}
