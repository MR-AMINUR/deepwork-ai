package com.deepwork.ai.ai;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class AIClientService {

    public  AIResponse processAudio(MultipartFile file) {

        try
        {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            ByteArrayResource resource = new ByteArrayResource(file.getBytes()) {

                public String getFilename() {
                    return file.getOriginalFilename();
                }
            };

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", resource);

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            String AI_URL = "https://cryptic-tradition-glaring.ngrok-free.dev/analyze";
            ResponseEntity<AIResponse> response = restTemplate.postForEntity(AI_URL, requestEntity, AIResponse.class);

            return response.getBody();
        } catch (IOException e) {
            throw new RuntimeException("Error calling AI service", e);
        }
    }
}
