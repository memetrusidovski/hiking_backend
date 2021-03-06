package com.example.TestJWT;

import com.example.TestJWT.models.MyUserDetails;
import com.example.TestJWT.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class MyUserDetailService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUserName(userName);
        
        //System.out.println("=====> " + user.map(MyUserDetails::new).get().getUsername());
        user.orElseThrow(() -> new UsernameNotFoundException("User not found: " + userName));

        return user.map(MyUserDetails::new).get();
        //return new MyUserDetails(user);
    }
}
