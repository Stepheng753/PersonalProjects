
x = linspace( -2, 2, 1e6);
figure(), plot(x,y(x),'r'); grid on; hold on;
plot(x, 0*x + 4, 'b')
plot(x, 0*x - 1, 'b')
text(-pi/2 - .1, -.8, '$-\pi/2$', 'interpreter', 'latex')
text(pi/2-.2, -.8, '$\pi/2$', 'interpreter', 'latex')
text(1,1, '$y = d - \ell \cos \theta$', 'interpreter', 'latex')
text(-.2,-.3, '$y = d - \ell$', 'interpreter', 'latex')
text(-.2,4.3, '$y = d $', 'interpreter', 'latex')
ylim([-2 7]);

i = -1.25;
while (i < 1.5)
    plot([i i], [y(i) 4], 'r')
    i = i + .25;
end


function y1 = y(x)
    y1 = (16/(pi^2)).*x.^2;
end