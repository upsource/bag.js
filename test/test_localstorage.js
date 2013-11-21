
describe('localStorage tests', function () {

  var bag = new window.Bag({
    stores: [ 'localstorage' ]
  });

  var key = 'test_key';
  var obj = { lorem: 'imsum', dolorem: 'casum' };
  var obj2 = { tratum: 'curem', lafem: 'pendum' };


  it('key set', function (done) {
    bag.set(key, obj, function (err) {
      assert.notOk(err);
      done();
    });
  });


  it('key get', function (done) {
    bag.get(key, function (err, data) {
      assert.notOk(err);
      assert.deepEqual(obj, data);
      done();
    });
  });


  it('key update', function (done) {
    bag.set(key, obj2, function (err) {
      assert.notOk(err);
      bag.get(key, function (err, data) {
        assert.notOk(err);
        assert.deepEqual(obj2, data);
        done();
      });
    });
  });


  it('key remove', function (done) {
    bag.remove(key, function (err) {
      assert.notOk(err);
      bag.get(key, function(err, data) {
        assert.ok(err);
        assert.notOk(data);
        done();
      });
    });
  });


  it('persistance', function (done) {
    bag.set(key, obj, function (err) {
      assert.notOk(err);
      bag.clear(true, function(err) {
        assert.notOk(err);
        bag.get(key, function (err, data) {
          assert.notOk(err);
          assert.deepEqual(obj, data);
          done();
        })
      });
    });
  });


  it('clear', function (done) {
    bag.set(key, obj, function (err) {
      assert.notOk(err);
      bag.clear(function(err) {
        assert.notOk(err);
        bag.get(key, function (err, data) {
          assert.ok(err);
          assert.notOk(data);
          done();
        })
      });
    });
  });

  it('keep not expired', function (done) {
    bag.set(key, obj, 1, function (err) {
      assert.notOk(err);
      setTimeout(function () {
        bag.clear(true, function(err) {
          assert.notOk(err);
          bag.get(key, function (err, data) {
            assert.notOk(err);
            assert.deepEqual(obj, data);
            done();
          });
        });
      }, 10);
    });
  });

  it('clear expired', function (done) {
    bag.set(key, obj, 0.005, function (err) {
      assert.notOk(err);
      setTimeout(function () {
        bag.clear(true, function(err) {
          assert.notOk(err);
          bag.get(key, function (err, data) {
            assert.ok(err);
            assert.notOk(data);
            done();
          });
        });
      }, 10);
    });
  });

});