require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-roller-picker"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  # s.platforms    = { :ios => "10.0" }
  s.platform     = :ios, "13.0"
  s.source       = { :git => "https://github.com/levi-li-yi/react-native-roll-picker.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm}"

  s.dependency "React-Core"
  s.dependency 'React-RCTViewManager'
end