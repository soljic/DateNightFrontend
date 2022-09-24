# MANUAL STEPS TO CONFIGURE OVH INSTANCE
Below are manual steps that need to be followed to setup a new production instance. You will need to update the OVH instance and Github secrets.

## Add deploy key to OVH instance
The deploy key should allow READ access to the instance machine. It will be used to pull changes from the master branch before every build and deploy cycle.

1. ssh into instance
2. follow this tutorial
* https://docs.github.com/en/developers/overview/managing-deploy-keys#deploy-keys


## Add Github secrets; authorize pubkey on instance
Watch this for reference:
* https://www.youtube.com/watch?v=gW1TDirJ5E4

1. create ssh-key on local machine
* `$: ssh-keygen -t ed25519 -a 200 -C "GH-prod-deployer"`

2. use PRIVATE KEY from the key you just created as Github secret `PROD_KEY`
* get contents of the file (cat, pbcopy, clip...)
* paste contents in `https://github.com/Spiritus-Memoria-Organization/webapp/settings/secrets/actions` as `PROD_KEY`

3. use PUBLIC KEY from the key you just create and add it to `~/.ssh/authorized_keys` ON OVH INSTANCE
```bash
$: ssh ubuntu@141.95.100.131
$: cd ~/.ssh/
$: vi 
```

4. the secrets are used by GH Action `deploy_prod.yml`
You need to have these secrets set up:
* `PROD_HOST`
* `PROD_KEY`
* `PROD_USERNAME`
