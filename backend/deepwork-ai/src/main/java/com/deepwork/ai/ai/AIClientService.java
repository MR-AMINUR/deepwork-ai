package com.deepwork.ai.ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class AIClientService {

    @Value("${ai.service.url}")
    private String AI_URL;

    public AIResponse processAudio(MultipartFile file) {

        try {
            // Step 1: Set timeouts for large audio files
            SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
            factory.setConnectTimeout(60000);       // 60 seconds to connect
            factory.setReadTimeout(600000);          // 10 minutes to read response

            RestTemplate restTemplate = new RestTemplate(factory);

            // Step 2: Set headers including ngrok bypass
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);
            headers.set("ngrok-skip-browser-warning", "true");  // Fix ngrok interception

            // Step 3: Build multipart body
            ByteArrayResource resource = new ByteArrayResource(file.getBytes()) {
                @Override
                public String getFilename() {
                    return file.getOriginalFilename();
                }
            };

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", resource);

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            // Step 4: Call AI service
            ResponseEntity<AIResponse> response = restTemplate.postForEntity(AI_URL, requestEntity, AIResponse.class);

            return response.getBody();

        } catch (IOException e) {
            throw new RuntimeException("Error reading audio file", e);
        } catch (Exception e) {
            throw new RuntimeException("Error calling AI service: " + e.getMessage(), e);
        }
    }
}