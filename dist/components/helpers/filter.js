"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const util = require("util");
const cleanStack = require("clean-stack");
// TODO: Inject this constant from outside
const filter_path = '../../../api/filters';
const BASE_FILTERS_PATH = path.join(__dirname, filter_path);
class FiltersWrapper {
    constructor(filters, basePath) {
        this.filters = filters;
        this.basePath = basePath || BASE_FILTERS_PATH;
    }
    static apply(filtersNames, basePath) {
        return new FiltersWrapper(filtersNames, basePath).requireFilters();
    }
    requireFilters() {
        return this.filters.map((filterName) => {
            try {
                let f = filterName;
                if (f && util.isString(f)) {
                    // Try to load filter from file
                    f = require(path.join(this.basePath, `./${f}`));
                    // Fix for moth modules systems (import / require)
                    f = f.default || f;
                }
                return f;
            }
            catch (e) {
                // TODO: Construct a base error
                e.stack = cleanStack(e.stack);
                if (e.message.match(new RegExp(filterName))) {
                    // Throw a direct message when filter was not found
                    e.message = `Filter not found: ${path.join(filter_path, filterName)}`;
                    throw e;
                }
                else {
                    // Unknown error
                    throw e;
                }
            }
        });
    }
}
exports.default = FiltersWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL2NvbXBvbmVudHMvaGVscGVycy9maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBNkI7QUFDN0IsNkJBQTZCO0FBQzdCLDBDQUEwQztBQUUxQywwQ0FBMEM7QUFDMUMsTUFBTSxXQUFXLEdBQUcsc0JBQXNCLENBQUM7QUFDM0MsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUU1RCxNQUFxQixjQUFjO0lBSWpDLFlBQVksT0FBYyxFQUFFLFFBQWlCO1FBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxJQUFJLGlCQUFpQixDQUFDO0lBQ2hELENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQXNCLEVBQUUsUUFBUTtRQUMzQyxPQUFPLElBQUksY0FBYyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNyRSxDQUFDO0lBRUQsY0FBYztRQUNaLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFlLEVBQUUsRUFBRTtZQUMxQyxJQUFJO2dCQUNGLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDekIsK0JBQStCO29CQUMvQixDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDaEQsa0RBQWtEO29CQUNsRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7aUJBQ3BCO2dCQUNELE9BQU8sQ0FBQyxDQUFDO2FBQ1Y7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDViwrQkFBK0I7Z0JBQy9CLENBQUMsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFO29CQUMzQyxtREFBbUQ7b0JBQ25ELENBQUMsQ0FBQyxPQUFPLEdBQUcscUJBQXFCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUM7b0JBQ3RFLE1BQU0sQ0FBQyxDQUFDO2lCQUNUO3FCQUFNO29CQUNMLGdCQUFnQjtvQkFDaEIsTUFBTSxDQUFDLENBQUM7aUJBQ1Q7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUVGO0FBdkNELGlDQXVDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gJ3V0aWwnO1xuaW1wb3J0ICogYXMgY2xlYW5TdGFjayBmcm9tICdjbGVhbi1zdGFjayc7XG5cbi8vIFRPRE86IEluamVjdCB0aGlzIGNvbnN0YW50IGZyb20gb3V0c2lkZVxuY29uc3QgZmlsdGVyX3BhdGggPSAnLi4vLi4vLi4vYXBpL2ZpbHRlcnMnO1xuY29uc3QgQkFTRV9GSUxURVJTX1BBVEggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCBmaWx0ZXJfcGF0aCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbHRlcnNXcmFwcGVyIHtcbiAgZmlsdGVyczogYW55O1xuICBiYXNlUGF0aDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGZpbHRlcnM6IGFueVtdLCBiYXNlUGF0aD86IHN0cmluZykge1xuICAgIHRoaXMuZmlsdGVycyA9IGZpbHRlcnM7XG4gICAgdGhpcy5iYXNlUGF0aCA9IGJhc2VQYXRoIHx8IEJBU0VfRklMVEVSU19QQVRIO1xuICB9XG5cbiAgc3RhdGljIGFwcGx5KGZpbHRlcnNOYW1lczogc3RyaW5nW10sIGJhc2VQYXRoKSB7XG4gICAgcmV0dXJuIG5ldyBGaWx0ZXJzV3JhcHBlcihmaWx0ZXJzTmFtZXMsIGJhc2VQYXRoKS5yZXF1aXJlRmlsdGVycygpO1xuICB9XG5cbiAgcmVxdWlyZUZpbHRlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVycy5tYXAoKGZpbHRlck5hbWU6IGFueSkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbGV0IGYgPSBmaWx0ZXJOYW1lO1xuICAgICAgICBpZiAoZiAmJiB1dGlsLmlzU3RyaW5nKGYpKSB7XG4gICAgICAgICAgLy8gVHJ5IHRvIGxvYWQgZmlsdGVyIGZyb20gZmlsZVxuICAgICAgICAgIGYgPSByZXF1aXJlKHBhdGguam9pbih0aGlzLmJhc2VQYXRoLCBgLi8ke2Z9YCkpO1xuICAgICAgICAgIC8vIEZpeCBmb3IgbW90aCBtb2R1bGVzIHN5c3RlbXMgKGltcG9ydCAvIHJlcXVpcmUpXG4gICAgICAgICAgZiA9IGYuZGVmYXVsdCB8fCBmO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBUT0RPOiBDb25zdHJ1Y3QgYSBiYXNlIGVycm9yXG4gICAgICAgIGUuc3RhY2sgPSBjbGVhblN0YWNrKGUuc3RhY2spO1xuICAgICAgICBpZiAoZS5tZXNzYWdlLm1hdGNoKG5ldyBSZWdFeHAoZmlsdGVyTmFtZSkpKSB7XG4gICAgICAgICAgLy8gVGhyb3cgYSBkaXJlY3QgbWVzc2FnZSB3aGVuIGZpbHRlciB3YXMgbm90IGZvdW5kXG4gICAgICAgICAgZS5tZXNzYWdlID0gYEZpbHRlciBub3QgZm91bmQ6ICR7cGF0aC5qb2luKGZpbHRlcl9wYXRoLCBmaWx0ZXJOYW1lKX1gO1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gVW5rbm93biBlcnJvclxuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG59XG4iXX0=