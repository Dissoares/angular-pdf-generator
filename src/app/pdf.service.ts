import { Injectable } from '@angular/core';
import autoTable from 'jspdf-autotable';
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
    logotipoUrl: string
  ) {
    const doc = new jsPDF();

    doc.addImage(logotipoUrl, 'PNG', 10, 10, 30, 30);
    doc.setFontSize(18);
    doc.text(textoCabecalho, 50, 20);

    autoTable(doc, {
      startY: 40,
      head: [['ID', 'Nome', 'Email']],
      body: dadosArray.map((item) => [item.id, item.name, item.email]),
    });

    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(textoRodape, 10, doc.internal.pageSize.height - 10);
      doc.text(
        `Página ${i} de ${pageCount}`,
        doc.internal.pageSize.width - 50,
        doc.internal.pageSize.height - 10
      );
    }

    doc.save('relatorio.pdf');
  }
}
