# Liquid 4.0 compatibility with Ruby >= 3.2 (tainted? removed in Ruby 3.2+)
module Liquid
  class Variable
    def taint_check(context, obj)
      # no-op - tainted? was removed in Ruby 3.2+
    end
  end
end
