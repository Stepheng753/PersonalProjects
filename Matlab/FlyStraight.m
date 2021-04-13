clear
figure(1)
clf
hold off

grid on
hold on

lastN = 1000;
a = ones(1,lastN);

for n = 2 : lastN 
    if (gcd(n, a(n-1)) == 1) 
        a(n) = a(n-1) + n + 1;
    else 
        a(n) = a(n-1) / gcd(n, a(n-1));
    end
end
a = horzcat(1,a);
n = 0: lastN;

plot(n,a(n+1),'r.')


