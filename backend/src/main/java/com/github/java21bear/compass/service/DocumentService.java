package com.github.java21bear.compass.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.ai.document.Document;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Service;

@Service
public class DocumentService {
  private final VectorStore vectorStore;
  
  public DocumentService(VectorStore vectorStore) {
    this.vectorStore = vectorStore;
  }
  
  public void loadPdf() {
    System.out.println("\nDocument登録開始\n");
    Resource[] resources;
    try {
      resources = new PathMatchingResourcePatternResolver().getResources("classpath:/documents/syllabus/2026/*.pdf");
    } catch (IOException e) {
      throw new RuntimeException("PDFの取得に失敗しました。", e);
    }
    List<Document> allDocuments = new ArrayList<>();
    for (Resource resource : resources) {
      PagePdfDocumentReader reader = new PagePdfDocumentReader(resource);
      List<Document> documents = reader.get();
      allDocuments.addAll(documents);
    }
    System.out.println("\nPDFから読み込んだDocument数: " + allDocuments.size() + "\n");
    vectorStore.add(allDocuments);
    System.out.println("\nVectorStoreへの登録完了\n");
  }
}
