import com.myrecipe.auth.dto.TokenPair;
import com.myrecipe.auth.jwt.JwtTokenProvider;
import com.myrecipe.auth.service.InvalidTokenException;
import com.myrecipe.auth.token.domain.RefreshToken;
import com.myrecipe.auth.token.repository.RefreshTokenRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;

    public void save(RefreshToken token){
        refreshTokenRepository.save(token);
    }

    public RefreshToken validateExistsAndNotExpired(String refreshToken){
        RefreshToken savedToken = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new InvalidTokenException("Refresh Token이 유효하지 않습니다."));
        
        if(savedToken.isExpired(Instant.now())){
            throw new InvalidTokenException("Refresh Token이 만료되었습니다.");
        }
        return savedToken;
    }

    @Transactional
    public void rotate(String oldRefreshToken, RefreshToken newRefreshToken){
        refreshTokenRepository.deleteByToken(oldRefreshToken);
        refreshTokenRepository.save(newRefreshToken);
    }
}