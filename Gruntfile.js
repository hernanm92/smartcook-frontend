module.exports = function (grunt) {

  var fileList = [
    "public/javascripts/config.js",
    "public/javascripts/app.js",

    "public/javascripts/plugins/angular-css-injector.js",
    "public/javascripts/plugins/ui-bootstrap-tpls-0.13.0.min.js",
    "public/javascripts/plugins/angular-selection-model-custom.js",
    "public/javascripts/plugins/jquery.min.js",
    "public/javascripts/plugins/pageslide.min.js",
    "public/javascripts/plugins/dirPagination.min.js",
    "public/javascripts/plugins/ng-clip.min.js",
    "public/javascripts/plugins/zero-clipboard.min.js",
    "public/javascripts/plugins/bootstrap.min.js",
    "public/javascripts/plugins/angular-growl.min.js",
    "public/javascripts/plugins/select.min.js",
    "public/javascripts/plugins/angular-sanitize.min.js",
    "public/javascripts/plugins/ng-FitText.js",
    "public/javascripts/plugins/moment.min.js",
    "public/javascripts/plugins/angular-moment.min.js",
    "public/javascripts/plugins/scrollglue.min.js",
    "public/javascripts/plugins/angular-ui-switch.js",
    "public/javascripts/plugins/ng-tags-input.min.js",
    "public/javascripts/plugins/elastic.js",
    "public/javascripts/plugins/flow.min.js",
    "public/javascripts/plugins/bootstro.js",
    "public/javascripts/plugins/ng-flow.min.js",
    "public/javascripts/plugins/angular-animate.min.js",
    "public/javascripts/plugins/ngStorage.min.js",
    "public/javascripts/plugins/angular-messages.min.js",
    "public/javascripts/plugins/notify.min.js",
    "public/javascripts/plugins/angular-block-ui.min.js",
    "public/javascripts/plugins/spin.js",
    "public/javascripts/plugins/angular-spinner.min.js",
    "public/javascripts/plugins/ng-file-upload-shim.min.js",
    "public/javascripts/plugins/ng-file-upload.min.js",
    "public/javascripts/plugins/azure-blob-upload.js",
    "public/javascripts/plugins/jquery.countdown.js",
    "public/javascripts/plugins/jquery.ba-throttle-debounce.min.js",
    "public/javascripts/plugins/jquery.knob.js",
    "public/javascripts/plugins/angular_circle_countdown.js",

    "public/javascripts/factory/ingredient.js",
    "public/javascripts/factory/recipe.js",
    "public/javascripts/factory/restriction.js",
    "public/javascripts/factory/category.js",
    "public/javascripts/factory/user.js",
    "public/javascripts/factory/item.js",
    "public/javascripts/factory/validate.js",
    "public/javascripts/factory/ingredientPerRecipes.js",
    "public/javascripts/factory/frequentCommensal.js",
    "public/javascripts/factory/foodCategoriesPerUser.js",
    "public/javascripts/factory/recipePerUser.js",
    "public/javascripts/factory/badge.js",
    "public/javascripts/factory/badgePerUsers.js",
    "public/javascripts/factory/tips.js",

    "public/javascripts/controller/base.js",
    "public/javascripts/controller/menu.js",
    "public/javascripts/controller/home.js",
    "public/javascripts/controller/profile.js",
    "public/javascripts/controller/login.js",
    "public/javascripts/controller/register.js",
    "public/javascripts/controller/aboutUs.js",
    "public/javascripts/controller/addCommensal.js",
    "public/javascripts/controller/loadIngredient.js",
    "public/javascripts/controller/listing.js",
    "public/javascripts/controller/top-listing.js",
    "public/javascripts/controller/validate.js",
    "public/javascripts/controller/createRecipe.js",
    "public/javascripts/controller/base-recipe.js",
    "public/javascripts/controller/modal.js",
    "public/javascripts/controller/modals/ingredient.js",
    "public/javascripts/controller/modals/recipe.js",
    "public/javascripts/controller/recipe-view.js",
    "public/javascripts/controller/edit-recipe.js",
    "public/javascripts/controller/counter.js",
    "public/javascripts/controller/topQualified.js",
    "public/javascripts/controller/topCategories.js",
    "public/javascripts/controller/favorites.js",
    "public/javascripts/controller/modals/comensalsForSearch.js",

    "public/javascripts/service/exampleService.js",
    "public/javascripts/service/eventService.js",
    "public/javascripts/service/callbackHandler.js",
    "public/javascripts/service/failedRequestHandler.js",
    "public/javascripts/service/userSession.js",
    "public/javascripts/service/facebook.js",
    "public/javascripts/service/interceptor/interceptor.js",
    "public/javascripts/service/helpers/notify.js",
    "public/javascripts/service/searcher.js",
    "public/javascripts/service/imgs.js",
    "public/javascripts/service/azure.js",
    "public/javascripts/service/recipe.js",
    "public/javascripts/service/recipeUser.js",
    "public/javascripts/service/ingredient.js",
    "public/javascripts/service/restrictions.js",
    "public/javascripts/service/mergeProfile.js",
    "public/javascripts/service/mapper.js",
    "public/javascripts/service/home.js",
    "public/javascripts/service/migration.js",

    "public/javascripts/models/recipe.js",
    "public/javascripts/models/user.js",
    "public/javascripts/models/profile.js",

    "public/javascripts/directives/fix-validate-menu.js"
    
  ]

  var cssFileList = [
    "public/stylesheets/angular-growl.min.css",
    "public/stylesheets/loading-button.min.css",
    "public/stylesheets/awesome-bootstrap-checkbox.min.css",
    "public/stylesheets/loaders.min.css",
    "public/stylesheets/select.min.css",
    "public/stylesheets/font-awesome.min.css",
    "public/stylesheets/angular-ui-switch.css",
    "public/stylesheets/createRecipe.css",
    "public/stylesheets/searchByName.css",
    "public/stylesheets/validateRecipe.css",
    "public/stylesheets/bootstro.css",
    "public/stylesheets/ng-tag/ng-tags-input.css",
    "public/stylesheets/ng-tag/ng-tags-input.bootstrap.css",
    "public/stylesheets/userProfile.css",
    "public/stylesheets/loadIngredient.css",
    "public/stylesheets/addCommensal.css",
    "public/stylesheets/topCategories.css",
    "public/stylesheets/register.css",
    "public/stylesheets/ui-bootstrap-csp.css",
    "public/stylesheets/home/home.css",
    "public/stylesheets/angular-block-ui.min.css",
    "public/stylesheets/detail-recipe.css",
    "public/stylesheets/angular_circle_countdown.css"
  ]

  var stageCss = ["public/stylesheets/*.css",
    //"public/stylesheets/angular-growl.min.css",
    //"public/stylesheets/loading-button.min.css",
    //"public/stylesheets/awesome-bootstrap-checkbox.min.css",
    //"public/stylesheets/loaders.min.css",
    "public/stylesheets/stage/bootstrap.min.css",
    "public/stylesheets/stage/fury.css"
  ]
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      ugly: {
        options:  {
          processImport: true
        },
        files: {
          'public/minified/all.min.css': cssFileList
        }
      },
      beautiful: {
        options: {
          advanced: false,
          keepBreaks: true,
          processImport: true
        },
        files: {
          'public/minified/all.min.css': cssFileList
        }
      },
    },
    jsvalidate: {
      options: {
        globals: {},
        esprimaOptions: {},
        verbose: false
      },
      targetName: {
        files: {
          src: fileList
        }
      }
    },
    uglify: {
      ugly: {
        options: {
          mangle: false,
          compress: true
        },
        files: {
          'public/minified/all.min.js': fileList,
        }
      },
      beautiful: {
        options: {
          mangle: false,
          compress: false,
          beautify: true
        },
        files: {
          'public/minified/all.min.js': fileList
        }
      }
    },
    watch: {
      public: {
        files: ['public/stylesheets/*.css', 'public/javascripts/**/*.js', 'public/stylesheets/**/*.css'],
        tasks: ['development'],
        options: {
          event: ['added', 'deleted', 'changed'],
          livereaload: true,
          reload: true
        }
      }
    },
    ngconstant: {
      development: {
        options: {
          name: 'config',
          dest: 'public/javascripts/config.js'
        },
        constants: {
          config: {
            domain: 'http://localhost:5000',
            styleFolder: 'common',
            applicationPrefix: 'development-'
          }
        }
      },
      production: {
        options: {
          name: 'config',
          dest: 'public/javascripts/config.js'
        },
        constants: {
          config: {
            domain: 'http://api-smartcook.eastus.cloudapp.azure.com:3000',
            styleFolder: 'common',
            applicationPrefix: ''
          }
        }
      },
      stage: {
        options: {
          name: 'config',
          dest: 'public/javascripts/config.js'
        },
        constants: {
          config: {
            domain: 'http://13.85.79.112:5000',
            styleFolder: 'stage',
            applicationPrefix: 'stage-'
          }
        }
      }
    }
  });

  var target = grunt.option('target') || 'development';
  grunt.registerTask('development', ['ngconstant:' + target, 'jsvalidate', 'uglify:beautiful', 'cssmin:beautiful']);

  grunt.registerTask('production', ['ngconstant:production', 'uglify:ugly', 'cssmin:ugly']);

  grunt.registerTask('stage', ['ngconstant:stage', 'uglify:beautiful', 'cssmin:beautiful']);

  grunt.loadNpmTasks('grunt-ng-constant');

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-jsvalidate');

  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('grunt-contrib-watch');
};
