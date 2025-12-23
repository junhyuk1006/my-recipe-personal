package com.myrecipe.security.jwt;

import com.myrecipe.common.exception.client.UnauthorizedException;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider){
        this.jwtTokenProvider = jwtTokenProvider;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = resolveBearerToken(request);

        if(!StringUtils.hasText(token)){
            filterChain.doFilter(request, response);
            return;
        }

        try{
            Claims claims = jwtTokenProvider.parseClaims(token);

            if(!jwtTokenProvider.isAccessToken(claims)){
                throw new UnauthorizedException("Access Token이 아닙니다.");
            }

            Long userId = jwtTokenProvider.getUserId(claims);
            String role = jwtTokenProvider.getRole(claims);

            List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userId, null, authorities);

            // SecurityContext 에 등록
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // 다음 필터로
            filterChain.doFilter(request, response);
        } catch (UnauthorizedException e){
            // EntryPoint/Handle이 처리하도록 위로 던짐
            SecurityContextHolder.clearContext();
            throw e;
        } catch (Exception e){
            SecurityContextHolder.clearContext();
            throw new UnauthorizedException("유효하지 않은 토큰입니다.");
        }
    }

    private String resolveBearerToken(HttpServletRequest resquest){
        String header = resquest.getHeader("Authorization");
        if(!StringUtils.hasText(header)) return null;
        if(header.startsWith("Bearer")) return header.substring(7);
        return null;
    }
}
