require 'nats/io/client'
require 'uri'
require 'net/http'
require 'cgi'

fd = IO.sysopen('/proc/1/fd/1', 'w')
a = IO.new(fd, mode: 'w')
a.sync = true

nats = NATS::IO::Client.new

nats.connect(servers: [ENV['NATS_URL']])
nats.subscribe('todo', queue: 'worker') do |msg|
  uri = URI("https://api.telegram.org/bot#{ENV['BOT_TOKEN']}/sendMessage?chat_id=#{ENV['CHAT_ID']}&text=#{CGI.escape(msg)}")
  res = Net::HTTP.get_response(uri)
  a.puts res.body if res.is_a?(Net::HTTPSuccess)
end

loop do
  sleep 5
end
