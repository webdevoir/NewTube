# == Schema Information
#
# Table name: comments
#
#  id         :bigint(8)        not null, primary key
#  body       :text             not null
#  video_id   :integer          not null
#  author_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Comment < ApplicationRecord
  belongs_to :video,
    class_name: :Video,
    foreign_key: :video_id

  belongs_to :author,
    class_name: :User,
    foreign_key: :author_id
    
end