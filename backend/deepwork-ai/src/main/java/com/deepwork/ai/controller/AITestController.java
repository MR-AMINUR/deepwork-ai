package com.deepwork.ai.controller;

import com.deepwork.ai.ai.AIClientService;
import com.deepwork.ai.ai.AIResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/ai")
public class AITestController {

    @Autowired
    private AIClientService aiClientService;

    @PostMapping("/test")
    public AIResponse testAI(@RequestParam("file")MultipartFile file) {

        return aiClientService.processAudio(file);
    }
}
