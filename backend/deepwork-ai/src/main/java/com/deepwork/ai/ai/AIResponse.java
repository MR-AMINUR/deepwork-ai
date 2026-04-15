package com.deepwork.ai.ai;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AIResponse {


    private String transcript = " ";

    private String summary = " ";

    private List<String> tasks;

}
