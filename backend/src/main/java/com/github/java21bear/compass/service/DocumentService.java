package com.github.java21bear.compass.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.ai.document.Document;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class DocumentService {
  private final VectorStore vectorStore;
  private final JdbcTemplate jdbcTemplate;
  
  public DocumentService(VectorStore vectorStore, JdbcTemplate jdbcTemplate) {
    this.vectorStore = vectorStore;
    this.jdbcTemplate = jdbcTemplate;
  }
  
  public void save(String content) {
    Document document = new Document(content);
    vectorStore.add(List.of(document));
  }
  
  public void loadPdf() {
    String year = "2026";
    System.out.println("\nDocument登録開始\n");
    Resource[] resources;
    try {
      resources = new PathMatchingResourcePatternResolver().getResources("classpath:/documents/syllabus/" + year + "/*.pdf");
    } catch (IOException e) {
      throw new RuntimeException("PDFの取得に失敗しました。", e);
    }
    List<Document> allDocuments = new ArrayList<>();
    for (Resource resource : resources) {
      String source = resource.getFilename();
      if (source == null) {
        continue;
      }
      if (isRegistered(year, source)) {
        System.out.println("登録済みのためスキップ: " + year + " / " + source);
        continue;
      }
      System.out.println("登録対象: " + year + " / " + source);
      PagePdfDocumentReader reader = new PagePdfDocumentReader(resource);
      List<Document> documents = reader.get();
      for (Document document : documents) {
        document.getMetadata().put("year", year);
        document.getMetadata().put("source", source);
      }
      allDocuments.addAll(documents);
    }
    if (allDocuments.isEmpty()) {
      System.out.println("\n登録するDocumentはありません。\n");
      return;
    }
    System.out.println("\nPDFから読み込んだDocument数: " + allDocuments.size() + "\n");
    vectorStore.add(allDocuments);
    System.out.println("\nVectorStoreへの登録完了\n");
  }

  private boolean isRegistered(String year, String source) {
    String sql = """
      SELECT EXISTS (
        SELECT 1
        FROM vector_store
        WHERE metadata->>'year' = ?
          AND metadata->>'source' = ?
      )
      """;
    Boolean registered = jdbcTemplate.queryForObject(sql, Boolean.class, year, source);
    return Boolean.TRUE.equals(registered);
  }
}
