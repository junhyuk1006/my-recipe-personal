package com.myrecipe.common.exception.client;

import lombok.Getter;

@Getter
public class DuplicateEmailException extends RuntimeException {
    private final String errorCode;

    public DuplicateEmailException(String message) {
        super(message);
        this.errorCode = "ERR_DUPLICATE_EMAIL";
    }
}
