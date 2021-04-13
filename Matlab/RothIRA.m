clear
figure(1)
clf
hold off

grid on
hold on

rate = 1.08;
maxCon = 6000;
currAge = 20;
retireAge = 65;
ageDiff = retireAge - currAge;

rothIRA = zeros(ageDiff + 1, 1);
rothIRA(1) = rothIRA(1) + maxCon;

for i = 2 : size(rothIRA)
    rothIRA(i) = rothIRA(i-1) * rate;
    rothIRA(i) = rothIRA(i) + maxCon;
end

ageLim = currAge : retireAge;

for i = 1 : size(rothIRA)
    fprintf('Total Value at Beginning of Age %.0f : $%.2f \n\n', ageLim(i) ,rothIRA(i));
end

totalCon = 6000 * ageDiff;
totalWithdrawl = rothIRA(size(rothIRA,1));
totalGain = totalWithdrawl - totalCon;

fprintf('\nTotal Contributions at Age %.0f : $%.2f \n\n', retireAge, totalCon);
fprintf('Total Withdrawl at Age %.0f : $%.2f \n\n', retireAge, totalWithdrawl);
fprintf('Total Gain at Age %.0f : $%.2f \n\n', retireAge, totalGain);

