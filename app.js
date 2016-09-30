/**
 * Module dependencies.
 */

var express = require('express')
    , http = require('http')
    , path = require('path')
    , azure = require('azure-storage')
var app = express();
//azure config
var AZURE_STORAGE_ACCOUNT = 'imgsmartcook';
var AZURE_STORAGE_ACCESS_KEY = 'WOtYCCLjVwR8egXn4VV2FFcArVyNPi+lkL6KCGipNiGn0bWRShZ6lLDwLMdiD+EfcKdIBFNYdiGnaiOQXvLFyQ==';
var blobService = initBlobService();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.compress());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.get('/general/countDown', function (req, res) {
    res.render('general/countDown');
});

app.get('/general/commensalsModal', function (req, res) {
    res.render('general/commensalsModal');
});
app.get('/', function (req, res) {
    res.render('index');
});
app.get('/general/home', function (req, res) {
    res.render('general/home');
});
app.get('/general/profile', function (req, res) {
    res.render('general/profile');
});
app.get('/general/login', function (req, res) {
    res.render('general/login');
});
app.get('/general/register', function (req, res) {
    res.render('general/register');
});
app.get('/general/listing', function (req, res) {
    res.render('general/listing');
});
app.get('/general/top-listing', function (req, res) {
    res.render('general/top-listing');
});
app.get('/general/topCategories', function (req, res) {
    res.render('general/topCategories');
});
app.get('/general/topQualified', function (req, res) {
    res.render('general/topQualified');
});
app.get('/general/favorites', function (req, res) {
    res.render('general/favorites');
});
app.get('/general/validate', function (req, res) {
    res.render('general/validate');
});
app.get('/general/createRecipe', function (req, res) {
    res.render('general/createRecipe');
});
app.get('/general/aboutus', function (req, res) {
    res.render('general/aboutUs');
});
app.get('/general/addcommensal', function (req, res) {
    res.render('general/addCommensal');
});
app.get('/general/loadIngredient', function (req, res) {
    res.render('general/loadIngredient');
});
app.get('/general/confirmForm', function (req, res) {
    res.render('general/confirmForm');
});
app.get('/general/ingredients/empty-ing-template', function (req, res) {
    res.render('general/ingredients/empty-ing-template');
});
app.get('/general/ingredients/ing-template', function (req, res) {
    res.render('general/ingredients/ing-template');
});
app.get('/general/channel', function (req, res) {
    res.render('general/channel');
});
app.get('/general/modals/ingredient', function (req, res) {
    res.render('general/modals/ingredient');
});
app.get('/general/modals/recipe', function (req, res) {
    res.render('general/modals/recipe');
});
app.get('/general/detail-recipe', function (req, res) {
    res.render('general/detail-recipe');
});
app.get('/general/recipe-detail-template', function (req, res) {
    res.render('general/recipe-detail-template');
});
app.get('/sas', function (req, res) {
    var settings = req.query;
    console.log(req.query);
    var sas = generateSasToken(settings.container, settings.blobName);
    res.status(200);
    res.send(sas);
})

//azure functions
function initBlobService() {
    var blobService = azure.createBlobService(AZURE_STORAGE_ACCOUNT, AZURE_STORAGE_ACCESS_KEY);
    generateProperties(blobService);
    return blobService;
}

function generateProperties(blobService) {
    var properties = {
        Cors: {
            CorsRule: [
                {
                    AllowedOrigins: ['*'],
                    AllowedMethods: ['GET', 'PUT'],
                    AllowedHeaders: ['*'],
                    ExposedHeaders: ['*'],
                    MaxAgeInSeconds: 500,
                }
            ]
        }
    }
    blobService.setServiceProperties(properties, function (error, result, response) {
        if (!error) {
            console.log('Propiedades agregadas');
        }
    });
}

function generateSasToken(container, blobName, permissions) {

    // Create a SAS token that expires in an hour
    // Set start time to five minutes ago to avoid clock skew.
    var startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() - 5);
    var expiryDate = new Date(startDate);
    expiryDate.setMinutes(startDate.getMinutes() + 60);
    permissions = azure.BlobUtilities.SharedAccessPermissions.WRITE || azure.BlobUtilities.SharedAccessPermissions.READ;
    var sharedAccessPolicy = {
        AccessPolicy: {
            Permissions: permissions,
            Start: startDate,
            Expiry: expiryDate
        }
    };
    var sasToken = blobService.generateSharedAccessSignature(container, blobName, sharedAccessPolicy);
    return sasToken;
}

app.listen(3000)
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));

});
