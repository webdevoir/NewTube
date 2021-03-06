# == Schema Information
#
# Table name: users
#
#  id                  :bigint(8)        not null, primary key
#  username            :string           not null
#  password_digest     :string           not null
#  session_token       :string           not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  avatar_file_name    :string
#  avatar_content_type :string
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#  banner_file_name    :string
#  banner_content_type :string
#  banner_file_size    :integer
#  banner_updated_at   :datetime
#  description         :text
#  night_mode          :boolean          default(FALSE)
#  autoplay            :boolean          default(FALSE)
#

class User < ApplicationRecord
  validates :username, :password_digest, :session_token, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :night_mode, inclusion: { in: [true, false] }
  validates :autoplay, inclusion: { in: [true, false] }

  has_attached_file :banner
  has_attached_file :avatar, styles: {
    thumb: '48x48'
  }
  validates_attachment_content_type :avatar, :banner, content_type: /\Aimage\/.*\Z/

  has_many :videos,
    class_name: :Video,
    foreign_key: :author_id,
    primary_key: :id,
    dependent: :destroy

  has_many :comments,
    class_name: :Comment,
    foreign_key: :author_id,
    primary_key: :id,
    dependent: :destroy

  has_many :likes,
    class_name: :Like,
    foreign_key: :user_id,
    primary_key: :id,
    dependent: :destroy

  has_many :liked_comments, through: :likes, source: :likeable, source_type: 'Comment'
  has_many :liked_videos, through: :likes, source: :likeable, source_type: 'Video'

   has_many :subscriptions,
       foreign_key: :subscriber_id,
       class_name: :Subscription,
       primary_key: :id,
       dependent: :destroy

   has_many :subscribers,
     foreign_key: :subscribee_id,
     class_name: :Subscription,
     primary_key: :id,
     dependent: :destroy

   has_many :subscribed_channels,
     through: :subscriptions,
     source: :subscribee

   has_many :subsciber_channels,
     through: :subscribers,
     source: :subscriber

  has_many :watchlaters,
    foreign_key: :user_id,
    class_name: :Watchlater,
    primary_key: :id,
    dependent: :destroy

  has_many :vidwatchlaters,
    through: :watchlaters,
    source: :video

  has_many :views,
    dependent: :destroy

  has_many :watched_videos,
    through: :views,
    source: :video

  attr_reader :password
  after_initialize :ensure_session_token

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user
    user.valid_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

end
