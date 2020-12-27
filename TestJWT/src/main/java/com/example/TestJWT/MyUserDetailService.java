package com.example.TestJWT;

import com.example.TestJWT.models.MyUserDetails;
import com.example.TestJWT.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailService implements UserDetailsService {

    @Autowired
    UserRespository userRespository;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Optional<User> user = userRespository.findByUserName(userName);

        user.orElseThrow(() -> new UsernameNotFoundException("User not found: " + userName));

        return user.map(MyUserDetails::new).get();
    }
}
