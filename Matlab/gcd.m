function gcdVal = gcd(num1, num2)
    
    if (num2 == 0) 
        gcdVal = num1;
        return
    end
    gcdVal = gcd(num2, mod(num1, num2));
end

