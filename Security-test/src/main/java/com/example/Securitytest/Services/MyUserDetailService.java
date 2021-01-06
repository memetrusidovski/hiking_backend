package com.example.Securitytest.Services;

import com.example.Securitytest.Models.MyUserDetail;
import com.example.Securitytest.Models.User;
import com.example.Securitytest.Respositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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

        System.out.println(user.get().getUserName() + "   " + user.get().getPassword());
        return user.map(MyUserDetail::new).get();
        //return new MyUserDetails(user);
    }
}
