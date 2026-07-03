package com.deepwork.ai.ai;

import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.client5.http.entity.mime.MultipartEntityBuilder;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.ContentType;
import org.apache.hc.core5.http.ClassicHttpResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.InputStream;

@Service
public class AIClientService {

    private static final Logger logger = LoggerFactory.getLogger(AIClientService.class);

    @Value("${ai.service.url}")
    private String AI_URL;

    public AIResponse processAudio(MultipartFile file) {
        logger.info("Calling AI service at: {}", AI_URL);
        
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {

            HttpPost httpPost = new HttpPost(AI_URL);

            // ngrok bypass header
            httpPost.setHeader("ngrok-skip-browser-warning", "true");

            // Build multipart body — streams the file, no Content-Length needed
            org.apache.hc.core5.http.HttpEntity entity = MultipartEntityBuilder.create()
                    .addBinaryBody(
                            "file",
                            file.getInputStream(),
                            ContentType.create(file.getContentType()),
                            file.getOriginalFilename()
                    )
                    .build();

            httpPost.setEntity(entity);

            // Execute and parse response
            return httpClient.execute(httpPost, (ClassicHttpResponse response) -> {
                int statusCode = response.getCode();
                logger.info("AI service responded with status: {}", statusCode);
                
                InputStream responseBody = response.getEntity().getContent();
                ObjectMapper mapper = new ObjectMapper();
                
                if (statusCode >= 200 && statusCode < 300) {
                    return mapper.readValue(responseBody, AIResponse.class);
                } else {
                    String errorBody = new String(responseBody.readAllBytes());
                    logger.error("AI service error: {}", errorBody);
                    throw new RuntimeException("AI service returned error: " + statusCode + " - " + errorBody);
                }
            });

        } catch (Exception e) {
            logger.error("Error calling AI service", e);
            throw new RuntimeException("Error calling AI service: " + e.getMessage(), e);
        }
    }
}