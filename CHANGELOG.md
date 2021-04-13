# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.0.15](https://github.com/ecomplus/application-starter/compare/v1.0.14...v1.0.15) (2021-04-13)


### Bug Fixes

* **deps:** update all non-major dependencies ([#29](https://github.com/ecomplus/application-starter/issues/29)) ([47eddb1](https://github.com/ecomplus/application-starter/commit/47eddb198b55e67253344a2daacc00b42b7b0b31))
* **sync-from-ideris:** save last ideris sku right after item being properly handled ([8ef46fb](https://github.com/ecomplus/application-starter/commit/8ef46fbc42814dc813fc7fb0fb3b7a8800fc1016))

### [1.0.14](https://github.com/ecomplus/application-starter/compare/v1.0.13...v1.0.14) (2021-04-03)


### Bug Fixes

* **sync-from-ideris:** no need to parse stores `ideris_last_update` 'dataHora' to Date ([e812937](https://github.com/ecomplus/application-starter/commit/e8129378e2427d7a536b001ffd2079bd775b33ef))

### [1.0.13](https://github.com/ecomplus/application-starter/compare/v1.0.12...v1.0.13) (2021-04-02)


### Bug Fixes

* **sync-from-ideris:** must await find item by sku response to proceed ([4f108ca](https://github.com/ecomplus/application-starter/commit/4f108cafbc209a6b75d7f94927a5dc920235ff09))
* **sync-from-ideris:** properly send put request to update sku quantity ([89bf5d9](https://github.com/ecomplus/application-starter/commit/89bf5d91a8af0eb7333166f172d87a36657dbef1))
* **sync-from-ideris:** try to set firestore document if `lastIderisOrder` only ([0fa1cb3](https://github.com/ecomplus/application-starter/commit/0fa1cb38b97ad1285d74296b971b922418c83fd5))

### [1.0.12](https://github.com/ecomplus/application-starter/compare/v1.0.11...v1.0.12) (2021-04-02)


### Bug Fixes

* **deps:** update @ecomplus/application-sdk to v22.0.0-firestore.1.14.3 ([0767c87](https://github.com/ecomplus/application-starter/commit/0767c87676a19284c7bf542c37e227632df554e0))
* **deps:** update all non-major dependencies ([#19](https://github.com/ecomplus/application-starter/issues/19)) ([f78f68b](https://github.com/ecomplus/application-starter/commit/f78f68b4e4b422c46ff9ec26dbd49c9a167bf87b))
* **sync-from-ideris:** ensure quantity set is valid when updating stock ([a9e5cff](https://github.com/ecomplus/application-starter/commit/a9e5cff3982c7eb5e6269ee944deecd40cde5a3e))
* **update-tokens:** edit cron to run each 3h interval ([bd6454a](https://github.com/ecomplus/application-starter/commit/bd6454a29372881768f4d7125352ac5e0b969246))

### [1.0.11](https://github.com/ecomplus/application-starter/compare/v1.0.10...v1.0.11) (2021-02-03)


### Bug Fixes

* **deps:** update all non-major dependencies ([#13](https://github.com/ecomplus/application-starter/issues/13)) ([2c1f51e](https://github.com/ecomplus/application-starter/commit/2c1f51e68603cbdd8966fefa149f1f0e565f3ce1))
* **ecom-config:** add PATCH products to auth scope ([0249854](https://github.com/ecomplus/application-starter/commit/0249854c17838f477ebff7b8ccb2037642054301))

### [1.0.10](https://github.com/ecomplus/application-starter/compare/v1.0.9...v1.0.10) (2020-11-05)


### Bug Fixes

* **deps:** update all non-major dependencies ([#11](https://github.com/ecomplus/application-starter/issues/11)) ([66290b2](https://github.com/ecomplus/application-starter/commit/66290b28657a2dc222548a766dcb6b234130544f))
* **refresh-tokens:** add scheduled cloud function to run update ([af43c14](https://github.com/ecomplus/application-starter/commit/af43c147d59ce4cbbf341fbf78dca4fc91786d08))
* **sync:** back with sync from ideris scheduled function ([cb5556e](https://github.com/ecomplus/application-starter/commit/cb5556e5da4561904889a6a740e5dfea74307d33))

### [1.0.9](https://github.com/ecomplus/application-starter/compare/v1.0.8...v1.0.9) (2020-10-26)


### Bug Fixes

* **deps:** update all non-major dependencies ([#8](https://github.com/ecomplus/application-starter/issues/8)) ([142eecc](https://github.com/ecomplus/application-starter/commit/142eecc07bbd8065bee7c4f3f2a35060dbcf83e4))
* **imports:** set storeId for ecomClient requests ([b3e17f7](https://github.com/ecomplus/application-starter/commit/b3e17f700b1d0dd66e09a8cb4a080443e8d95d97))

### [1.0.8](https://github.com/ecomplus/application-starter/compare/v1.0.7...v1.0.8) (2020-10-21)


### Bug Fixes

* **deps:** update all non-major dependencies ([#7](https://github.com/ecomplus/application-starter/issues/7)) ([d31d883](https://github.com/ecomplus/application-starter/commit/d31d883a3ddf97a824761691bad7c0f2d8dc4a61))
* **export-product:** fix setting variations quantity ([da4d311](https://github.com/ecomplus/application-starter/commit/da4d311a17a6fef780194e6a0eb25ddb133fac9a))
* **post-job-handler:** edit status for retry to > 419 ([105bdc4](https://github.com/ecomplus/application-starter/commit/105bdc435a6e39cc8ddc799a3be0030a6b72a418))
* **sync-from-ideris:** preset queued order ids correctly (fix nested field name) ([dc434c0](https://github.com/ecomplus/application-starter/commit/dc434c01b800b35edfac19f949f4101e8a1b2d25))

### [1.0.7](https://github.com/ecomplus/application-starter/compare/v1.0.6...v1.0.7) (2020-10-18)


### Bug Fixes

* **deps:** update all non-major dependencies ([#6](https://github.com/ecomplus/application-starter/issues/6)) ([49913d7](https://github.com/ecomplus/application-starter/commit/49913d750ac247eb3e7c9c836bbcd998674996b1))
* **parse-order:** set generic email for customer if empty ([d1e9de6](https://github.com/ecomplus/application-starter/commit/d1e9de6a2c5e24bdc0df7fc082757818867da0b7))

### [1.0.6](https://github.com/ecomplus/application-starter/compare/v1.0.5...v1.0.6) (2020-10-07)


### Bug Fixes

* **parse-order:** set random product id for items not found ([c0ef0ac](https://github.com/ecomplus/application-starter/commit/c0ef0acb61ab37f1671c0af973a7990bf8f54102))

### [1.0.5](https://github.com/ecomplus/application-starter/compare/v1.0.4...v1.0.5) (2020-10-07)


### Bug Fixes

* **import-order:** fix checking last status for fulfillments ([42217eb](https://github.com/ecomplus/application-starter/commit/42217eb3ede37210765c414c6f29208610049712))
* **parse-order:** fix handling items, sku may by null from ideris ([3ea1263](https://github.com/ecomplus/application-starter/commit/3ea1263fb9c7feece97daeaf89c493a60079a9a4))

### [1.0.4](https://github.com/ecomplus/application-starter/compare/v1.0.3...v1.0.4) (2020-10-03)


### Bug Fixes

* **product-to-ecomplus:** parse dimensions to number (float) ([91c9675](https://github.com/ecomplus/application-starter/commit/91c967505a95e4cec91a2ab75f399631019426e8))

### [1.0.3](https://github.com/ecomplus/application-starter/compare/v1.0.2...v1.0.3) (2020-10-03)


### Bug Fixes

* **parse-order:** add item to order even if product not found ([ec2b491](https://github.com/ecomplus/application-starter/commit/ec2b4919e32410d57a5b582d3c22e17ef9a35cdb))
* **parse-order:** return item search promise on order parse chain ([4b6a4b2](https://github.com/ecomplus/application-starter/commit/4b6a4b255f2de4a810658c47672ab6f0635f0fb2))
* **sync-ideris-orders:** ensure saving last order by id ([feb65b9](https://github.com/ecomplus/application-starter/commit/feb65b9ab6f0fbf6547775ec2ca2386cf12507b4))

### [1.0.2](https://github.com/ecomplus/application-starter/compare/v1.0.1...v1.0.2) (2020-10-02)


### Bug Fixes

* **sync-ideris-orders:** prevent duplicated queued ids ([77471f2](https://github.com/ecomplus/application-starter/commit/77471f26b5b95b9fa029d63656e78a6986373e94))
* **sync-orders:** documentation says 50, but ideris api limit is 20 order ids to list ([8b6bc1f](https://github.com/ecomplus/application-starter/commit/8b6bc1f925c953411f3cd5fb34c7d7783f1c56af))
* **webhook:** count requests by store to bigger delay, add initial random delay ([b429178](https://github.com/ecomplus/application-starter/commit/b429178f6868d9b67a6a799901c2a46befcba54f))

### [1.0.1](https://github.com/ecomplus/application-starter/compare/v1.0.0...v1.0.1) (2020-10-02)


### Bug Fixes

* **webhooks:** save running proccess to firestore to prevent duplication ([97bd50e](https://github.com/ecomplus/application-starter/commit/97bd50ef00be64d6ddf98d1cf2b79ab24b8ce2b7))

## 1.0.0 (2020-09-30)


### Features

* **active-sync:** automatic fetch orders from ideris by date and handle import ([e184835](https://github.com/ecomplus/application-starter/commit/e1848358b5f4a6d0344b29a0653ae855ec207478))
* **config:** admin settings for manual/auto sync ([45a4d4b](https://github.com/ecomplus/application-starter/commit/45a4d4b18331d44d85d65c0a8d5051e20b4dfd17))
* **cron:** add scheduled cloud function to active sync from ideris api ([684ae02](https://github.com/ecomplus/application-starter/commit/684ae022f2f82df8be1eec82d93e3b5b731e549d))
* **ecom-config:** initial app attributes and auth scope ([e65c9bc](https://github.com/ecomplus/application-starter/commit/e65c9bc14b0474307da12a5c3e0f68fbf1645a33))
* **export-product:** handling product export from ecomplus to ideris ([299fdf2](https://github.com/ecomplus/application-starter/commit/299fdf2a2c5d894201a29ad2d6505557250e3fb1))
* **ideris-client:** basic ideris api client and constructor with auth handler ([67d1a26](https://github.com/ecomplus/application-starter/commit/67d1a26dae9ee981b3888fd87c9694b8da94864d))
* **import-order:** handling parse and import/update orders from ideris to ecomplus ([613eb11](https://github.com/ecomplus/application-starter/commit/613eb11eb3ba05025019c95f4077ba0183ade646))
* **import-product:** handling product imports from ideris to ecomplus ([f494efc](https://github.com/ecomplus/application-starter/commit/f494efcd98b772bfe20966c49b5de5a2e6488cf4))
* **integration:** handle log and retry after each integration job ([473a523](https://github.com/ecomplus/application-starter/commit/473a523c5a12737ee64e3ce01f7c653bb902fc66))
* **store-api:** abstraction to update app data ([49e53c4](https://github.com/ecomplus/application-starter/commit/49e53c436301e5937cf2ed4de831efa19208617f))
* **sync-from-ideris:** handling saved orders update ([9f294e5](https://github.com/ecomplus/application-starter/commit/9f294e5983a46d0b4cf7db33153f5950c77c6fdb))
* **webhook:** handling app data changes to handle import/export manual triggers ([a5bef66](https://github.com/ecomplus/application-starter/commit/a5bef6646ce70396339bdc0e16b3a95d9dc33064))
* **webhook:** handling product create/update triggers ([3670fc2](https://github.com/ecomplus/application-starter/commit/3670fc236bc1bc5ca87ae2f19d2b38634d8d2c3f))


### Bug Fixes

* **admin-settings:** simpler config schema (match current handlers) ([851c642](https://github.com/ecomplus/application-starter/commit/851c642ae318346a5651b80d15613f812344f387))
* **admin-settings:** update settings fields due to ideris api limitations ([2a01725](https://github.com/ecomplus/application-starter/commit/2a01725aca40d6bd189aecf9ec0f6809c24e9a31))
* **config:** add permissions to create new order ([da7c8d4](https://github.com/ecomplus/application-starter/commit/da7c8d41842eca4c39b1006418f383c8394b47b5))
* **config:** update procedure triggers and integration settings to fit ideris limitations ([d642649](https://github.com/ecomplus/application-starter/commit/d6426499ebdd2813c6a7230eb1c50888a3bd5280))
* **ecom-config:** update app scope, setup procedures and admin settings ([7cfd676](https://github.com/ecomplus/application-starter/commit/7cfd676685f41d403d360138a09fb143b7eab947))
* **export-product:** checking additional images extensions limited by ideris ([dd2a315](https://github.com/ecomplus/application-starter/commit/dd2a315672b50c3bc53733d60c6f186701fc94b8))
* **export-product:** checking images extensions limited by ideris ([4f710da](https://github.com/ecomplus/application-starter/commit/4f710da23253bbf577b640f0ddb441882e4bed77))
* **export-product:** fix handling (bad) ideris api response on products search ([4311278](https://github.com/ecomplus/application-starter/commit/4311278f4b47de847c490caa8a5cce698668b92b))
* **export-product:** fix handling (bad) ideris api response on products search ([30a932d](https://github.com/ecomplus/application-starter/commit/30a932d2666b1f843aa77f5a8598a24bbc99756c))
* **export-product:** fix handling product update price and quantity ([24670b5](https://github.com/ecomplus/application-starter/commit/24670b57807d08e6095e0e4d254fb19e70b83aa4))
* **export-product:** fix using `ideris.preparing` promise ([5de553f](https://github.com/ecomplus/application-starter/commit/5de553f67b1d26966bb466b81a6b76d17ba96306))
* **export-product:** limit ideris field 'descricaoLonga' to 5000 chars ([711c533](https://github.com/ecomplus/application-starter/commit/711c53342fdb57ddde4bb94bc699316ef872267e))
* **export-product:** limit ideris field 'titulo' string size ([3daefe5](https://github.com/ecomplus/application-starter/commit/3daefe512fbbfb286cb3b6c3b398296dac071ef4))
* **export-products:** check ideris request body length ([711fa16](https://github.com/ecomplus/application-starter/commit/711fa1610fbc76b79033f62e109f394a56a84216))
* **export-products:** check ideris request body length ([e46f42a](https://github.com/ecomplus/application-starter/commit/e46f42a489dd381c920ca1d3142a70fb1da2cebd))
* **export-products:** code fix on product parser ([e34f48c](https://github.com/ecomplus/application-starter/commit/e34f48c76257039f49a01e904289aac2e8b9f8cb))
* **export-products:** fix defining post handled job ([c2ff497](https://github.com/ecomplus/application-starter/commit/c2ff497457989e282b77252adcada1397731e9c5))
* **exports:** prevent creating new when intended to update only ([cd83d27](https://github.com/ecomplus/application-starter/commit/cd83d2716e2ea2f2f682bd5a7c864433771a0cf6))
* **handled-job:** small delay to re-queue failed integration action ([52397dc](https://github.com/ecomplus/application-starter/commit/52397dc56624d59544c18611a6dfd31b8ac77644))
* **ideris-client:** fix calling login method ([4c5b610](https://github.com/ecomplus/application-starter/commit/4c5b6104deab9665316da8994557d4d96457268c))
* **ideris-client:** must return axios instance ([68370d6](https://github.com/ecomplus/application-starter/commit/68370d67b72830dc0e1ba1df1cc78964c872d03b))
* **ideris-client:** prevent undefined header prop ([9a1679d](https://github.com/ecomplus/application-starter/commit/9a1679dfaff2e1014707a8b9266d7a1cfdf5e264))
* **ideris-login:** delay and retry on first error ([e0b948f](https://github.com/ecomplus/application-starter/commit/e0b948f6c182a85734169d3c21b7a19eedcfd825))
* **import-order:** always return resolved promise ([8a6b994](https://github.com/ecomplus/application-starter/commit/8a6b99426dc5e247bb5c59b2625cccdd7275d1fb))
* **import-order:** fix arguments to parse order function ([102fd78](https://github.com/ecomplus/application-starter/commit/102fd7891c1eadcb6c2ad053e17e1dc04d8ebd26))
* **import-order:** fix arguments to parse order function (promise) ([fd30d9b](https://github.com/ecomplus/application-starter/commit/fd30d9ba9ca277c994c7434a351684531d43d139))
* **import-order:** fix checking ideris order id (string) ([5086715](https://github.com/ecomplus/application-starter/commit/5086715f28c9506ba4758fce5388c483a13074e9))
* **import-order:** throw error when ideris order is not found by id ([2322bf9](https://github.com/ecomplus/application-starter/commit/2322bf9a2070396f6c7bb62cf55b88255533da8a))
* **import-orders:** fix checking last status to prevent duplications ([125514f](https://github.com/ecomplus/application-starter/commit/125514f553dfe3b52969f3cd79e3402226d68344))
* **import-orders:** fix posting status records on subresources (no _id) ([ecd233f](https://github.com/ecomplus/application-starter/commit/ecd233fb271fcafdfdb63adf001cbef8aa73b066))
* **import-orders:** fix returned payload for job ([060ce84](https://github.com/ecomplus/application-starter/commit/060ce84765f6a857b5aed6a90506fa9f97d31843))
* **import-orders:** must push requests to promises array ([8ed8909](https://github.com/ecomplus/application-starter/commit/8ed89095411c455f7330ba62a8b5ee9d5ee5e811))
* **import-orders:** prevent status duplication on update ([bc67f32](https://github.com/ecomplus/application-starter/commit/bc67f32a91e54c3a14fe80020e1be48504fd3cfe))
* **import-product:** fix grid id with pad start ([fad1254](https://github.com/ecomplus/application-starter/commit/fad125461f4fa602c850d17113695c67e264baf7))
* **import-product:** fix setting picture object after upload ([108b56a](https://github.com/ecomplus/application-starter/commit/108b56a574ab3c75f03f5d2ef439b630500cbd79))
* **import-product:** minor fix handling image uploads ([2db0a1a](https://github.com/ecomplus/application-starter/commit/2db0a1ac43b281d721d3458883599915bded5b96))
* **import-product:** minor fix handling variations ([65eb722](https://github.com/ecomplus/application-starter/commit/65eb722640efc8312a886b824357351f0ad5c80f))
* **parse-product:** don't update main product stock for products with variations ([14b6efe](https://github.com/ecomplus/application-starter/commit/14b6efe1a16a2e3f592612e9029a6720970b3d72))
* **post-job-handler:** prevent error with null payload ([a2ff208](https://github.com/ecomplus/application-starter/commit/a2ff208f1076cb532a0036f1978b5551080f5256))
* **procedures:** update registered procedure triggers (orders and self data) ([057c667](https://github.com/ecomplus/application-starter/commit/057c6679be0a7d0089bcacbf1a92a6c1be2f82f4))
* **sync:** using custom props (__) for background queue ([d735948](https://github.com/ecomplus/application-starter/commit/d735948b9645cf0374068cc8164115f2085baaeb))
* **sync-from-ideris:** fix listing order ids from auth coll ([2d086c9](https://github.com/ecomplus/application-starter/commit/2d086c945e7a8f2e70d95a9a57ef906c7395bea3))
* **webhook:** padding queue entry object to further retry on error ([84511d1](https://github.com/ecomplus/application-starter/commit/84511d13eb7c18964d92160dfaaa6eae24bb13d7))
* **webhook:** properly calling integration handler with dynamic props ([bdf1632](https://github.com/ecomplus/application-starter/commit/bdf1632416817d731c1ce0aec513f8154f535b5e))

## [1.0.0-starter.15](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.14...v1.0.0-starter.15) (2020-07-26)


### Bug Fixes

* **deps:** bump @ecomplus/application-sdk@firestore ([fe4fe46](https://github.com/ecomplus/application-starter/commit/fe4fe46c2c4e1dfd21790f8c03a84245cb8fc8f3))
* **deps:** update all non-major dependencies ([#36](https://github.com/ecomplus/application-starter/issues/36)) ([b14f2e9](https://github.com/ecomplus/application-starter/commit/b14f2e9cb56d5b18500b678b074dbdbe099b041a))
* **deps:** update dependency firebase-admin to v9 ([#37](https://github.com/ecomplus/application-starter/issues/37)) ([204df95](https://github.com/ecomplus/application-starter/commit/204df95c37d24c455951081f9186178222097778))

## [1.0.0-starter.14](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.13...v1.0.0-starter.14) (2020-06-30)


### Bug Fixes

* **auth-callback:** check `row.setted_up` in place of 'settep_up' ([e2a73ca](https://github.com/ecomplus/application-starter/commit/e2a73ca029868d9c899d4a1c0d982f1c1ed5829f))
* **deps:** update all non-major dependencies ([#31](https://github.com/ecomplus/application-starter/issues/31)) ([702bee9](https://github.com/ecomplus/application-starter/commit/702bee9a31370579dd7718b5722180e5bb8996e8))
* **deps:** update dependency firebase-functions to ^3.7.0 ([#30](https://github.com/ecomplus/application-starter/issues/30)) ([0f459a3](https://github.com/ecomplus/application-starter/commit/0f459a3ab9fe21f8dc9e9bdfce33c0b6d43e3622))
* **deps:** update dependency firebase-tools to ^8.4.2 ([#29](https://github.com/ecomplus/application-starter/issues/29)) ([cf7e61e](https://github.com/ecomplus/application-starter/commit/cf7e61ef50aa976f33725d855ba19d06a7522fd4))
* **pkg:** update deps, start using node 10 ([172ed7f](https://github.com/ecomplus/application-starter/commit/172ed7f223cd23b9874c5d6209928b7d620b0cf6))

## [1.0.0-starter.13](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.12...v1.0.0-starter.13) (2020-06-03)


### Bug Fixes

* **deps:** update @ecomplus/application-sdk to v1.13.0 ([b424410](https://github.com/ecomplus/application-starter/commit/b42441089e7020774c9586ed176e691ef4c755be))
* **refresh-tokens:** force appSdk update tokens task ([139a350](https://github.com/ecomplus/application-starter/commit/139a350c230fa36c37ab83e2debfe979d831cb08))

## [1.0.0-starter.12](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.11...v1.0.0-starter.12) (2020-05-29)


### Bug Fixes

* **deps:** replace @ecomplus/application-sdk to firestore version ([3d2ee85](https://github.com/ecomplus/application-starter/commit/3d2ee85feb2edab77950e5c266514152fbc9674d))
* **deps:** update all non-major dependencies ([#21](https://github.com/ecomplus/application-starter/issues/21)) ([7a370da](https://github.com/ecomplus/application-starter/commit/7a370da11dfd098c0a90da05d39fc62f9264fd63))
* **deps:** update all non-major dependencies ([#26](https://github.com/ecomplus/application-starter/issues/26)) ([e37e0e8](https://github.com/ecomplus/application-starter/commit/e37e0e8151768d79e81f4184ab937ddf9d775a4f))
* **deps:** update dependency uglify-js to ^3.9.2 ([#20](https://github.com/ecomplus/application-starter/issues/20)) ([adccf0a](https://github.com/ecomplus/application-starter/commit/adccf0a2fed37f2ccce57ded20d25af85407ac8a))

## [1.0.0-starter.11](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.10...v1.0.0-starter.11) (2020-04-27)


### Bug Fixes

* **deps:** update @ecomplus/application-sdk to v1.11.13 ([70584c2](https://github.com/ecomplus/application-starter/commit/70584c245e97a1b539a3df3f74109f20d9a1fa3c))
* **setup:** ensure enable token updates by default ([67aea0e](https://github.com/ecomplus/application-starter/commit/67aea0eb363be3cc535a0f0f4d1b5b682958f243))

## [1.0.0-starter.10](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.9...v1.0.0-starter.10) (2020-04-27)


### Bug Fixes

* **deps:** update @ecomplus/application-sdk to v1.11.11 ([b8217d0](https://github.com/ecomplus/application-starter/commit/b8217d03fe92b5c233615a0b6b4c01d7bad676c2))
* **deps:** update all non-major dependencies ([#19](https://github.com/ecomplus/application-starter/issues/19)) ([a99797a](https://github.com/ecomplus/application-starter/commit/a99797a129d6e2383ef5ef69c06afacd13cccfb0))
* **setup:** do not disable updates on refresh-tokens route ([b983a45](https://github.com/ecomplus/application-starter/commit/b983a45ada5575ee6435f7b3016ef35c28355762))

## [1.0.0-starter.9](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.8...v1.0.0-starter.9) (2020-04-21)


### Bug Fixes

* **deps:** update @ecomplus/application-sdk to v1.11.10 ([8da579c](https://github.com/ecomplus/application-starter/commit/8da579c19c6530e8cc9fd338a07aece1fccc64ff))

## [1.0.0-starter.8](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.7...v1.0.0-starter.8) (2020-04-18)


### Bug Fixes

* **deps:** update all non-major dependencies ([#17](https://github.com/ecomplus/application-starter/issues/17)) ([785064e](https://github.com/ecomplus/application-starter/commit/785064ef5bf06db7c084f9b17b37a6077645735b))

## [1.0.0-starter.7](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.6...v1.0.0-starter.7) (2020-04-07)

## [1.0.0-starter.6](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.5...v1.0.0-starter.6) (2020-04-06)


### Bug Fixes

* **deps:** update all non-major dependencies ([#10](https://github.com/ecomplus/application-starter/issues/10)) ([b3c65e5](https://github.com/ecomplus/application-starter/commit/b3c65e5c7eb89a4825eb47c852ce65293d172314))
* **deps:** update all non-major dependencies ([#13](https://github.com/ecomplus/application-starter/issues/13)) ([33ff19b](https://github.com/ecomplus/application-starter/commit/33ff19bbdad1f34b6d1c255089dc0a0e4092b955))
* **deps:** update all non-major dependencies ([#8](https://github.com/ecomplus/application-starter/issues/8)) ([feba5b9](https://github.com/ecomplus/application-starter/commit/feba5b9cdc54e8304beff2b12658a6343ef37569))
* **deps:** update dependency firebase-functions to ^3.6.0 ([#15](https://github.com/ecomplus/application-starter/issues/15)) ([5f7f0a2](https://github.com/ecomplus/application-starter/commit/5f7f0a2bf5c744000996e2a0b78690b363462ee7))
* **deps:** update dependency firebase-tools to ^7.16.1 ([#14](https://github.com/ecomplus/application-starter/issues/14)) ([b8e4798](https://github.com/ecomplus/application-starter/commit/b8e479851bd02bf5929a7df8a71a761f1c1c1654))
* **deps:** update dependency firebase-tools to v8 ([#16](https://github.com/ecomplus/application-starter/issues/16)) ([b72560e](https://github.com/ecomplus/application-starter/commit/b72560e4fc86496499d553e47094ace25436272b))
* **ecom-modules:** fix parsing mod names to filenames and vice versa ([99c185a](https://github.com/ecomplus/application-starter/commit/99c185afebeae77deb61537ed9de1c77132c16ce))

## [1.0.0-starter.5](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.4...v1.0.0-starter.5) (2020-03-05)


### Features

* **market-publication:** handle full featured app publication to Market ([28379dc](https://github.com/ecomplus/application-starter/commit/28379dc3c4784e757c8f25e5d737f6143682b0db))
* **static:** handle static with server app files from public folder ([827d000](https://github.com/ecomplus/application-starter/commit/827d00079b0dc169b2eef31b8e0ac73c596307a8))

## [1.0.0-starter.4](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.3...v1.0.0-starter.4) (2020-02-21)


### Features

* **calculate-shipping:** basic setup for calculate shipping module ([db77595](https://github.com/ecomplus/application-starter/commit/db7759514bb25d151dd4508fb96b84c52b3e94ba))


### Bug Fixes

* **home:** fix replace accets regex exps to generate slug from title ([198cc0b](https://github.com/ecomplus/application-starter/commit/198cc0b911d4874d96f3cd5254d30cab5fe89765))
* **home:** gen slug from pkg name or app title if not set or default ([25c20bf](https://github.com/ecomplus/application-starter/commit/25c20bfade65a86e4f4b1026ef59a5694a022a74))

## [1.0.0-starter.3](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.2...v1.0.0-starter.3) (2020-02-21)

## [1.0.0-starter.2](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.1...v1.0.0-starter.2) (2020-02-21)


### Bug Fixes

* **config:** stop reading app from functions config ([7b9aab7](https://github.com/ecomplus/application-starter/commit/7b9aab727fefe8a5b84695e90a0d68e02b8c3f62))

## [1.0.0-starter.1](https://github.com/ecomplus/application-starter/compare/v1.0.0-starter.0...v1.0.0-starter.1) (2020-02-20)


### Features

* **get-auth:** endpoint to return auth id and token for external usage ([40a8ae2](https://github.com/ecomplus/application-starter/commit/40a8ae2e895d6e32c7032ca500040ec82c80dc5d))
* **server:** also supporting passing Store Id from query ([111f3a7](https://github.com/ecomplus/application-starter/commit/111f3a716fbfd2e155e3fb24242bddcae7cb065c))


### Bug Fixes

* **server:** remove 'routes' path when setting filename for routes ([119524c](https://github.com/ecomplus/application-starter/commit/119524c523a11364ed912769637a6f8e479af5f1))

## [1.0.0-starter.0](https://github.com/ecomplus/application-starter/compare/v0.1.1...v1.0.0-starter.0) (2020-02-18)


### Features

* **router:** recursive read routes dir to auto setup server routes ([ff2b456](https://github.com/ecomplus/application-starter/commit/ff2b45604723a8146c9481ea36a9400da5ccc2bc))


### Bug Fixes

* **home:** fix semver on for app.version (remove version tag if any) ([ad36461](https://github.com/ecomplus/application-starter/commit/ad364614a7f5599850ad39e00a94d310742e8f80))
* **middlewares:** update route files exports (named exports by methods) ([6a22e67](https://github.com/ecomplus/application-starter/commit/6a22e67135bc6110e6da6b4ab25f67ad8d77f597))

### [0.1.1](https://github.com/ecomplus/application-starter/compare/v0.1.0...v0.1.1) (2020-02-18)


### Features

* **env:** get 'pkg' from functions config ([bf45ec3](https://github.com/ecomplus/application-starter/commit/bf45ec33a2147d5be91fdc4955bd6cfa1b0867e2))
* **home:** set version and slug from root package, fix with uris ([d4b61fa](https://github.com/ecomplus/application-starter/commit/d4b61fab427aefdb2ac485d90eb1abe15d6aafc6))


### Bug Fixes

* **env:** firebase doesnt uppercase config ([502185e](https://github.com/ecomplus/application-starter/commit/502185ed30f346d8db77b849d6ba0eb48cb777cb))
* **require:** update @ecomplus/application-sdk dependency name ([d4174ac](https://github.com/ecomplus/application-starter/commit/d4174ac5425b85590db0e92d4b1d69a8567a6c55))

## [0.1.0](https://github.com/ecomplus/application-starter/compare/v0.0.4...v0.1.0) (2020-02-17)

### [0.0.4](https://github.com/ecomclub/firebase-app-boilerplate/compare/v0.0.3...v0.0.4) (2020-02-16)


### Bug Fixes

* **server:** update routes names (refresh-tokens) ([79a2910](https://github.com/ecomclub/firebase-app-boilerplate/commit/79a2910817cf4193b40e02b2b1e6b920e7fefb2d))

### [0.0.3](https://github.com/ecomclub/express-app-boilerplate/compare/v0.0.2...v0.0.3) (2020-02-15)


### Features

* **server:** start reading env options, handle operator token ([ce107b7](https://github.com/ecomclub/express-app-boilerplate/commit/ce107b74cde375e875a85cc3ba0cc6a73740785d))
* **update-tokens:** adding route to start update tokens service (no content) ([20c62ec](https://github.com/ecomclub/express-app-boilerplate/commit/20c62ec6800fc326b89e8cf54b2916f56e5910e4))


### Bug Fixes

* **auth-callback:** fix handling docRef (desn't need to get by id again) ([629ca5a](https://github.com/ecomclub/express-app-boilerplate/commit/629ca5ab9849e3822cc190f423da5bf2e0c4daab))
* **auth-callback:** save procedures if not new, check and set 'settep_up' ([#3](https://github.com/ecomclub/express-app-boilerplate/issues/3)) ([4a01f86](https://github.com/ecomclub/express-app-boilerplate/commit/4a01f86c37e09cd7c0363f6fbc80de6eeef3ba20))
* **ECOM_AUTH_UPDATE_INTERVAL:** disable set interval (no daemons on cloud functions) ([2aa2442](https://github.com/ecomclub/express-app-boilerplate/commit/2aa2442061f0308be9eb9430552fa04ad148788c))
* **env:** fixed to get appInfor variable ([e9b1a3c](https://github.com/ecomclub/express-app-boilerplate/commit/e9b1a3ce0d17ee74a5eada70589340fd5a70e786))
* **env:** fixed to get appInfor variable ([22687e2](https://github.com/ecomclub/express-app-boilerplate/commit/22687e25f611d49f8c01494af114e0289cec251e))
* **middleware:** check standard http headers for client ip ([5045113](https://github.com/ecomclub/express-app-boilerplate/commit/504511329afe9277d540f0f542a316d04634ce9e))

### 0.0.2 (2020-02-11)


### Bug Fixes

* **lib:** remove unecessary/incorrect requires with new deps ([69f2b77](https://github.com/ecomclub/express-app-boilerplate/commit/69f2b77))
* **routes:** fix handling appSdk (param) ([0cf2dde](https://github.com/ecomclub/express-app-boilerplate/commit/0cf2dde))
* **setup:** added initializeApp() to firebase admin ([e941e59](https://github.com/ecomclub/express-app-boilerplate/commit/e941e59))
* **setup:** manually setup ecomplus-app-sdk with firestore ([64e49f8](https://github.com/ecomclub/express-app-boilerplate/commit/64e49f8))
* **setup:** manually setup ecomplus-app-sdk with firestore ([c718bd0](https://github.com/ecomclub/express-app-boilerplate/commit/c718bd0))
* **setup:** manually setup ecomplus-app-sdk with firestore ([33909bf](https://github.com/ecomclub/express-app-boilerplate/commit/33909bf)), closes [/github.com/ecomclub/ecomplus-app-sdk/blob/master/main.js#L45](https://github.com/ecomclub//github.com/ecomclub/ecomplus-app-sdk/blob/master/main.js/issues/L45)
* **startup:** setup routes after appSdk ready, add home route ([d182555](https://github.com/ecomclub/express-app-boilerplate/commit/d182555))


### Features

* **firestore-app-boilerplate:** Initial commit ([c9963f0](https://github.com/ecomclub/express-app-boilerplate/commit/c9963f0))
* **firestore-app-boilerplate:** Initial commit ([be493ea](https://github.com/ecomclub/express-app-boilerplate/commit/be493ea))
* **firestore-support:** minor changes ([3718cba](https://github.com/ecomclub/express-app-boilerplate/commit/3718cba))
* **firestore-support:** refactoring to  use saveProcedures function ([62971ef](https://github.com/ecomclub/express-app-boilerplate/commit/62971ef))
* **firestore-support:** removed sqlite error clausule ([2d47996](https://github.com/ecomclub/express-app-boilerplate/commit/2d47996))
* **routes:** add home route (app json) ([42a3f2b](https://github.com/ecomclub/express-app-boilerplate/commit/42a3f2b))

# [LEGACY] Express App Boilerplate

### [0.1.1](https://github.com/ecomclub/express-app-boilerplate/compare/v0.1.0...v0.1.1) (2019-07-31)


### Bug Fixes

* **procedures:** fix checking for procedures array to run configureSetup ([1371cdc](https://github.com/ecomclub/express-app-boilerplate/commit/1371cdc))

## [0.1.0](https://github.com/ecomclub/express-app-boilerplate/compare/v0.0.2...v0.1.0) (2019-07-31)

### 0.0.2 (2019-07-31)


### Bug Fixes

* chain promise catch on lib getConfig ([281abf9](https://github.com/ecomclub/express-app-boilerplate/commit/281abf9))
* fix mergin hidden data to config ([8b64d58](https://github.com/ecomclub/express-app-boilerplate/commit/8b64d58))
* fix path to require 'get-config' from lib ([11425b0](https://github.com/ecomclub/express-app-boilerplate/commit/11425b0))
* get storeId from header and set on req object ([a3bebaa](https://github.com/ecomclub/express-app-boilerplate/commit/a3bebaa))
* handle error on get config instead of directly debug ([f182589](https://github.com/ecomclub/express-app-boilerplate/commit/f182589))
* routes common fixes ([2758a57](https://github.com/ecomclub/express-app-boilerplate/commit/2758a57))
* using req.url (from http module) instead of req.baseUrl ([d9057ca](https://github.com/ecomclub/express-app-boilerplate/commit/d9057ca))


### Features

* authentication callback ([8f18892](https://github.com/ecomclub/express-app-boilerplate/commit/8f18892))
* conventional store api error handling ([bcde87e](https://github.com/ecomclub/express-app-boilerplate/commit/bcde87e))
* function to get app config from data and hidden data ([ba470f5](https://github.com/ecomclub/express-app-boilerplate/commit/ba470f5))
* getting store id from web.js ([72f18c6](https://github.com/ecomclub/express-app-boilerplate/commit/72f18c6))
* handling E-Com Plus webhooks ([63ba19f](https://github.com/ecomclub/express-app-boilerplate/commit/63ba19f))
* main js file including bin web and local ([6b8a71a](https://github.com/ecomclub/express-app-boilerplate/commit/6b8a71a))
* pre-validate body for ecom modules endpoints ([f06bdb0](https://github.com/ecomclub/express-app-boilerplate/commit/f06bdb0))
* setup app package dependencies and main.js ([b2826ed](https://github.com/ecomclub/express-app-boilerplate/commit/b2826ed))
* setup base app.json ([015599a](https://github.com/ecomclub/express-app-boilerplate/commit/015599a))
* setup daemon processes, configure store setup ([db3ca8c](https://github.com/ecomclub/express-app-boilerplate/commit/db3ca8c))
* setup procedures object ([c5e8627](https://github.com/ecomclub/express-app-boilerplate/commit/c5e8627))
* setup web app with express ([d128430](https://github.com/ecomclub/express-app-boilerplate/commit/d128430))
