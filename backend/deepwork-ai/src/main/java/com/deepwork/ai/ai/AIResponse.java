package com.deepwork.ai.ai;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class AIResponse {

    private String transcript = " ";
    private String summary = " ";
    private List<String> tasks;
    private List<String> insights;
}