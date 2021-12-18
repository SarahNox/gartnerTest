# Gartner

### INSTALL DEPENDENCIES

```
npm install
```

### PACKAGES INSTALLED

- jest (for the tests)

### EXECUTING THE CODE

```
npm run solution
```

This will create the `resultset.json` with the filtered clicks by the requirements of:

    1. For each IP within each one hour period, only the most expensive click is placed into the 
    result set.
    2. If more than one click from the same IP ties for the most expensive click in a one hour period,
    only place the earliest click into the result set.
    3. If there are more than 10 clicks for an IP in the overall array of clicks, do not include any 
    of those clicks in the result set.

### RUNNING THE TESTS

Tests are located in their own folder together with a mock file to make the tests themselves more readable without cluttering the file with mocks:

```
npm run test
```


### DISCLAIMER

I tested in the 3 latest node LTS, all working fine.